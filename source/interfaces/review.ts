import { Document } from 'mongoose';

export default interface IReview extends Document {
    name: string;
    rating: number;
    comment: string;
    userId: string;
    packageId: string;
}