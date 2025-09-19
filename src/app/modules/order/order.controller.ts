
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';
import config from '../../../config';
import { paginationFields } from '../product/product.constant';
import pick from '../../../shared/pick';

const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const { ...orderData } = req.body;
    const { order } = await OrderService.createOrder(orderData);
    // const { order, paymentUrl } = await OrderService.createOrder(orderData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Order created successfully',
        data: {
            order
        },
        // data: {
        //     order,
        //     paymentUrl,
        // },
    });
});

const createOrderWithoutPayment = asyncHandler(async (req: Request, res: Response) => {
    const { ...orderData } = req.body;
    const order = await OrderService.createOrderWithoutPayment(orderData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Order created successfully (Cash on Delivery)',
        data: order,
    });
});
const createOrderWithPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const { ...orderData } = req.body;
    const result = await OrderService.createOrderWithPayment(orderData);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: 'Order created successfully (Online Payment)',
     data: result,
   });
  }
);

// const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
//     const userId = req.user?.id;
//     console.log(userId);

//     const orders = await OrderService.getAllOrders(userId);
//     console.log(orders);

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Orders retrieved successfully',
//         data: orders,
//     });
// });

const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const userRole = req.user?.role; // Get user role from request
    const paginationOptions = pick(req.query, paginationFields);

    // Extract search, status, and sorting filters
    const filters = {
        searchTerm: req.query.searchTerm as string,
        status: req.query.status as string,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as string
    };

    const orders = await OrderService.getAllOrders(
      userId,
      userRole,
      paginationOptions,
      filters
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Orders retrieved successfully',
        data: orders.data,
        meta: orders.meta,
    });
});

const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const order = await OrderService.getOrderById(orderId, userId, userRole);

    if (!order) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'Order not found',
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order retrieved successfully',
        data: order,
    });
});

const paymentSuccess = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await OrderService.handlePaymentSuccess(orderId, req.body);
    res.redirect(
      `${config.client_url}/checkout/confirmation?orderId=${order?._id}`
    );
});

const paymentFailure = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await OrderService.handlePaymentFailure(orderId);
console.log(order);

    res.redirect(`${config.client_url}/checkout/failed`);
});

const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { status } = req.body;
    const user = req.user; // From authentication middleware

    const result = await OrderService.updateOrderStatus(
        orderId,
        status,
        user.id,
        user.role
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order status updated successfully',
        data: result,
    });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderById,
  paymentSuccess,
  paymentFailure,
  createOrderWithoutPayment,
  updateOrderStatus,
  createOrderWithPayment,
};