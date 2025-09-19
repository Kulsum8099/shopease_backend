import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { IShippingAddress } from './shipping-address.interface';
import { ShippingAddressService } from './shipping-address.service';

const createShippingAddress = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const payload = req.body;

    // console.log("ll", req.body);
    // console.log("ll44", req);

    console.log("userId", userId);
    console.log("payload", payload);



    // Add userId to the payload
    const addressData = {
        ...payload,
        userId
    };

    const result = await ShippingAddressService.createShippingAddress(
        userId,
        addressData
    );

    sendResponse<IShippingAddress>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Shipping address created successfully',
        data: result,
    });
});

const getShippingAddresses = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const result = await ShippingAddressService.getShippingAddresses(userId);

    sendResponse<IShippingAddress[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Shipping addresses retrieved successfully',
        data: result,
    });
});

const getDefaultShippingAddress = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id;

        const result = await ShippingAddressService.getDefaultShippingAddress(userId);

        sendResponse<IShippingAddress | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Default shipping address retrieved successfully',
            data: result,
        });
    }
);

const updateShippingAddress = asyncHandler(
    async (req: Request, res: Response) => {
        const addressId = req.params.id;
        const userId = req.user?._id;
        const payload = req.body;

        const result = await ShippingAddressService.updateShippingAddress(
            addressId,
            userId,
            payload
        );

        sendResponse<IShippingAddress>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Shipping address updated successfully',
            data: result,
        });
    }
);

const deleteShippingAddress = asyncHandler(
    async (req: Request, res: Response) => {
        const addressId = req.params.id;
        const userId = req.user?._id;

        const result = await ShippingAddressService.deleteShippingAddress(
            addressId,
            userId
        );

        sendResponse<IShippingAddress>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Shipping address deleted successfully',
            data: result,
        });
    }
);

export const ShippingAddressController = {
    createShippingAddress,
    getShippingAddresses,
    getDefaultShippingAddress,
    updateShippingAddress,
    deleteShippingAddress,
};