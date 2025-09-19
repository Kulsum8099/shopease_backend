import express from 'express';
import { ShippingAddressRoutes } from './shipping-address.routes';

const router = express.Router();

router.use('/shipping-addresses', ShippingAddressRoutes);

export const ShippingAddressModule = router;