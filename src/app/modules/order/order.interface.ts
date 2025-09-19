import { Model, Types } from "mongoose";

export type IOrder = {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    items: {
        product: Types.ObjectId;
        quantity: number;
        price: number;
        color?: string;
    }[];
    shippingAddress: {
        fullName: string;
        phone: string;
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isDefault?: boolean;
    };
    paymentMethod: 'SSLCommerz' | 'cod'; 
    paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentDetails?: Record<string, unknown>;
    subtotal: number;
    shippingFee: number;
    tax: number;
    total: number;
    status: OrderStatus;
    transactionId?: string;
}

export type OrderModel = Model<IOrder, Record<string, unknown>>;

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type IOrderFilters = {
    searchTerm?: string;
    status?: string;
    paymentStatus?: string;
    user?: string;
}