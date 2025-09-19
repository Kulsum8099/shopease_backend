import express from 'express';
import { BrandRoutes } from '../modules/brand/brand.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ColorRoutes } from '../modules/color/color.route';
import { ProductRoutes } from '../modules/product/product.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ShippingAddressRoutes } from '../modules/shipping-address/shipping-address.routes';
import { OrderRoutes } from '../modules/order/order.route';
import { ContactRoutes } from '../modules/contact/contact.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/brand',
    route: BrandRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/color',
    route: ColorRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/shipping-addresses',
    route: ShippingAddressRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
