import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IShippingAddress } from './shipping-address.interface';
import { ShippingAddress } from './shipping-address.model';

const createShippingAddress = async (
    userId: string,
    payload: IShippingAddress
): Promise<IShippingAddress> => {
    if (payload.isDefault) {
        await ShippingAddress.updateMany(
            { userId },
            { $set: { isDefault: false } }
        );
    }

    const shippingAddress = await ShippingAddress.create({
        ...payload,
        userId,
    });

    return shippingAddress;
};

const getShippingAddresses = async (
    userId: string
): Promise<IShippingAddress[]> => {
    return ShippingAddress.find({ userId }).sort({ isDefault: -1 });
};

const getDefaultShippingAddress = async (
    userId: string
): Promise<IShippingAddress | null> => {
    return ShippingAddress.findOne({ userId, isDefault: true });
};

const updateShippingAddress = async (
    addressId: string,
    userId: string,
    payload: Partial<IShippingAddress>
): Promise<IShippingAddress | null> => {
    if (payload.isDefault) {
        await ShippingAddress.updateMany(
            { userId, _id: { $ne: addressId } },
            { $set: { isDefault: false } }
        );
    }

    const updatedAddress = await ShippingAddress.findOneAndUpdate(
        { _id: addressId, userId },
        payload,
        { new: true, runValidators: true }
    );

    if (!updatedAddress) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Shipping address not found');
    }

    return updatedAddress;
};

const deleteShippingAddress = async (
    addressId: string,
    userId: string
): Promise<IShippingAddress | null> => {
    const deletedAddress = await ShippingAddress.findOneAndDelete({
        _id: addressId,
        userId,
    });

    if (!deletedAddress) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Shipping address not found');
    }

    // If deleted address was default, set another as default
    if (deletedAddress.isDefault) {
        const anyAddress = await ShippingAddress.findOne({ userId });
        if (anyAddress) {
            await ShippingAddress.findByIdAndUpdate(anyAddress._id, {
                isDefault: true,
            });
        }
    }

    return deletedAddress;
};

export const ShippingAddressService = {
    createShippingAddress,
    getShippingAddresses,
    getDefaultShippingAddress,
    updateShippingAddress,
    deleteShippingAddress,
};