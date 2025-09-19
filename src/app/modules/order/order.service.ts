import { Order } from './order.model';
import { IOrder, OrderStatus } from './order.interface';
import { validateSSLCommerzPayment } from './sslcommerz.service';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../interfaces/pagination';
import { paginationHelpers } from '../../util/paginationHelper';
import { sslConfig } from '../../../config/sslcommerz';
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../../config';
const createOrder = async (payload: IOrder): Promise<{ order: IOrder }> => {
  // Calculate totals
  payload.subtotal = payload.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  payload.shippingFee = payload.subtotal > 100 ? 0 : 10;
  payload.tax = payload.subtotal * 0.08;
  payload.total = payload.subtotal + payload.shippingFee + payload.tax;

  // Set default payment status based on method
  if (payload.paymentMethod === 'cod') {
    payload.paymentStatus = 'pending';
  } else {
    payload.paymentStatus = 'pending';
  }

  const order = await Order.create(payload);

  // For non-payment orders, just return the order
  return {
    order,
  };
};

// Add this new method
const createOrderWithoutPayment = async (payload: IOrder): Promise<IOrder> => {
  payload.paymentMethod = 'cod';
  const { order } = await createOrder(payload);
  return order;
};
const createOrderWithPayment = async (payload: IOrder): Promise<any> => {
  payload.paymentMethod = 'SSLCommerz';
  const { order } = await createOrder(payload);
  // console.log(order);
const tran_id = order._id?.toString();
  const data = {
    total_amount: payload.total,
    currency: 'BDT',
    tran_id: tran_id,
    success_url: `${config.server_url}/api/v1/orders/payment/success/${tran_id}`,
    fail_url: `${config.server_url}/api/v1/orders/payment/fail/${tran_id}`,
    cancel_url: `${config.server_url}/api/v1/orders/payment/cancel`,
    ipn_url: `${config.server_url}/api/v1/orders/payment/ipn`,
    shipping_method: 'Courier',
    product_name: 'Ecommerce Product',
    product_category: 'General',
    product_profile: 'general',
    cus_name: payload.shippingAddress.fullName,
    cus_email: 'email',
    cus_add1: 'address',
    cus_city: payload.shippingAddress.city,
    cus_postcode: payload.shippingAddress.postalCode,
    cus_country: payload.shippingAddress.country,
    cus_phone: payload.shippingAddress.phone,
    cus_fax: '',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(
    sslConfig.store_id,
    sslConfig.store_passwd,
    sslConfig.is_live
  );
  const apiResponse = await sslcz.init(data);
  return {
    order,
    paymentUrl: apiResponse.GatewayPageURL,
  };
};

const getAllOrders = async (
  userId: string,
  userRole: string,
  paginationOptions: IPaginationOptions,
  filters?: { searchTerm?: string; status?: string; sortBy?: string; sortOrder?: string }
) => {
  let query: any = {};

  // If not admin, only get orders for this user
  if (userRole !== 'admin') {
    query.user = userId;
  }

  // Add search functionality
  if (filters?.searchTerm) {
    const searchRegex = { $regex: filters.searchTerm, $options: 'i' };
    query.$or = [
      { _id: searchRegex }, // Search by order ID
      { 'shippingAddress.fullName': searchRegex }, // Search by customer name
      { 'shippingAddress.phone': searchRegex }, // Search by phone
      { 'shippingAddress.email': searchRegex }, // Search by email
    ];
  }

  // Add status filter
  if (filters?.status && filters.status !== 'all') {
    query.status = filters.status;
  }

  const {
    page = 1,
    limit = 10,
    skip,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = paginationHelpers.calculatePagination(paginationOptions);

  // Build sort conditions
  const sortConditions: any = {};
  if (filters?.sortBy && filters?.sortOrder) {
    sortConditions[filters.sortBy] = filters.sortOrder === 'asc' ? 1 : -1;
  } else {
    sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
  }

  const orders = await Order.find(query)
    .populate('user', 'name email')
    .populate('items.product', 'name price images')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Order.countDocuments(query);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: orders,
  };
};

// const getAllOrders = async (userId: string) => {
//     const orders = await Order.find({ user: userId })
//         .populate('user', 'name email')
//         .populate('items.product', 'name price images');
//     return orders;
// };

const getOrderById = async (
  orderId: string,
  userId: string,
  userRole?: string
): Promise<IOrder | null> => {
  const query: any = { _id: orderId };

  // Only add user filter if the requester is not an admin
  if (userRole !== 'admin') {
    query.user = userId;
  }

  const order = await Order.findOne(query)
    .populate('user', 'name email phone')
    .populate('items.product', 'name price images description');
  return order;
};

const handlePaymentSuccess = async (orderId: string, paymentData: any) => {
  const validatedData = await validateSSLCommerzPayment(paymentData);
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      paymentStatus: 'completed',
      paymentDetails: validatedData,
      transactionId: validatedData.tran_id,
      status: 'processing',
    },
    { new: true }
  );
  return order;
};

const handlePaymentFailure = async (orderId: string) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      paymentStatus: 'failed',
      status: 'cancelled',
    },
    { new: true }
  );
  return order;
};

const updateOrderStatus = async (
  orderId: string,
  newStatus: OrderStatus,
  userId: string,
  userRole: string
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  // Validate status transition
  if (userRole !== 'admin') {
    // Customers can only mark orders as delivered
    if (newStatus !== 'delivered') {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You can only mark orders as delivered'
      );
    }
    // Verify the order belongs to the customer
    if (order.user.toString() !== userId) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You can only update your own orders'
      );
    }
  }

  // Additional business logic validation
  if (order.status === 'cancelled') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Cannot update status of cancelled orders'
    );
  }

  order.status = newStatus;
  await order.save();

  return order;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  handlePaymentSuccess,
  handlePaymentFailure,
  createOrderWithoutPayment,
  updateOrderStatus,
  createOrderWithPayment,
};
