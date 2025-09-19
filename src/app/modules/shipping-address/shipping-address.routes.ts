import express from 'express';
import { ShippingAddressController } from './shipping-address.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ShippingAddressValidation } from './shipping-address.validation';
import authenticate from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/',
    authenticate,
    validateRequest(ShippingAddressValidation.createShippingAddressSchema),
    ShippingAddressController.createShippingAddress
);

router.get('/', authenticate, ShippingAddressController.getShippingAddresses);

router.get(
    '/default', authenticate,

    ShippingAddressController.getDefaultShippingAddress
);

router.patch(
    '/:id', authenticate,

    validateRequest(ShippingAddressValidation.updateShippingAddressSchema),
    ShippingAddressController.updateShippingAddress
);

router.delete('/:id', authenticate, ShippingAddressController.deleteShippingAddress);

export const ShippingAddressRoutes = router;