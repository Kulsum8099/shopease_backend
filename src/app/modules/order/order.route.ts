import express from 'express';
import { OrderController } from './order.controller';
import authenticate from '../../middlewares/auth';

const router = express.Router();

router.post('/', authenticate, OrderController.createOrder);
router.post('/cod', authenticate, OrderController.createOrderWithoutPayment);
router.post(
  '/ssl-commerz',
  authenticate,
  OrderController.createOrderWithPayment
);
// Get orders
router.get('/', authenticate, OrderController.getAllOrders);
router.get('/:id', authenticate, OrderController.getOrderById);
router.post('/payment/success/:orderId', OrderController.paymentSuccess);
router.post('/payment/fail/:orderId', OrderController.paymentFailure);
// Add new status update route
router.patch(
    '/:id/status',
    authenticate,
    OrderController.updateOrderStatus
);
export const OrderRoutes = router;