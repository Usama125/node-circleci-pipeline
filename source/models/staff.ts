import mongoose, { Schema } from 'mongoose';
import IStaff from '../interfaces/staff';

const StaffSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IStaff>('Staff', StaffSchema);