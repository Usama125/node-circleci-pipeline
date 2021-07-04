import mongoose, { Schema } from 'mongoose';
import IReview from '../interfaces/review';

const ReviewSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        packageId: {
            type: Schema.Types.ObjectId,
            ref: "Package"
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IReview>('Review', ReviewSchema);