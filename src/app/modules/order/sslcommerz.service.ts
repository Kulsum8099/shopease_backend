import axios from 'axios';
import { IOrder } from './order.interface';
import config from '../../../config';

export const initiateSSLCommerzPayment = async (order: IOrder) => {
    const data = {
        store_id: config.sslcommerz.store_id,
        store_passwd: config.sslcommerz.store_password,
        total_amount: order.total,
        currency: 'USD',
        tran_id: order._id?.toString(),
        success_url: `${config.server_url}/api/v1/payment/success/${order._id}`,
        fail_url: `${config.server_url}/api/v1/payment/fail/${order._id}`,
        cancel_url: `${config.server_url}/api/v1/payment/cancel/${order._id}`,
        ipn_url: `${config.server_url}/api/v1/payment/ipn`,
        shipping_method: 'Courier',
        product_name: 'Order',
        product_category: 'General',
        product_profile: 'general',
        cus_name: order.shippingAddress.fullName,
        cus_email: 'customer@example.com', // Get from user if available
        cus_add1: order.shippingAddress.street,
        cus_add2: order.shippingAddress.city,
        cus_city: order.shippingAddress.city,
        cus_state: order.shippingAddress.state,
        cus_postcode: order.shippingAddress.postalCode,
        cus_country: order.shippingAddress.country,
        cus_phone: order.shippingAddress.phone,
        ship_name: order.shippingAddress.fullName,
        ship_add1: order.shippingAddress.street,
        ship_add2: order.shippingAddress.city,
        ship_city: order.shippingAddress.city,
        ship_state: order.shippingAddress.state,
        ship_postcode: order.shippingAddress.postalCode,
        ship_country: order.shippingAddress.country,
        multi_card_name: '',
        value_a: order.user.toString(),
        value_b: '',
        value_c: '',
        value_d: '',
    };

    try {
        const response = await axios.post(
            config.sslcommerz.payment_url as string, // Type assertion
            data,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to initiate SSLCommerz payment');
    }
};

export const validateSSLCommerzPayment = async (data: any) => {
    const response = {
        val_id: data.val_id,
        amount: data.amount,
        card_type: data.card_type,
        store_amount: data.store_amount,
        card_no: data.card_no,
        bank_tran_id: data.bank_tran_id,
        tran_id: data.tran_id,
        currency: data.currency,
        card_issuer: data.card_issuer,
        card_brand: data.card_brand,
        card_issuer_country: data.card_issuer_country,
        card_issuer_country_code: data.card_issuer_country_code,
        currency_type: data.currency_type,
        currency_amount: data.currency_amount,
        currency_rate: data.currency_rate,
        risk_title: data.risk_title,
        risk_level: data.risk_level,
    };

    return response;
};