import { Document } from 'mongoose';

export default interface IPackage extends Document {
    name: string;
    description: string;
    features: string;
    price: number;
    duration: string;
    long: string;
    lat: string;
    imageUrl: string;
    categoryId: string;
}