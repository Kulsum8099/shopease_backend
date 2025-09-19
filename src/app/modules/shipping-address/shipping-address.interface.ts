import { Document, Schema } from 'mongoose';

export type IShippingAddress = {
    fullName: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    userId: Schema.Types.ObjectId;
} & Document;

export type ShippingAddress = {
    fullName: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    userId?: Schema.Types.ObjectId;
};