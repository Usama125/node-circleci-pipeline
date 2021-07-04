import mongoose, { Schema } from 'mongoose';
import IPackage from '../interfaces/package';

const PackageSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        features: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        long: {
            type: String,
            required: true
        },
        lat: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPackage>('Package', PackageSchema);