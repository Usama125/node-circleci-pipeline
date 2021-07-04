import mongoose, { Schema } from 'mongoose';
import IBooking from '../interfaces/booking';

const BookingSchema: Schema = new Schema(
    {
        selectedDate: {
            type: String,
            required: true
        },
        selectedTime: {
            type: String,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        },
        adminFee: {
            type: Number,
            required: true
        },
        totalCost: {
            type: Number,
            required: true
        },
        bookingUserInformation: {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            emailAddress: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: String,
                required: true
            },
            address: {
                address1: {
                    type: String,
                    required: true
                }, 
                address2: {
                    type: String,
                    required: false
                },
                city: {
                    type: String,
                    required: true
                },
                postalCode: {
                    type: String,
                    required: true
                }
            }
        },
        additionalInformation: {
            completeAddressWith4Corners:  {
                type: String,
                required: true
            },
            tires:  {
                type: Number,
                required: true
            },
            tireSize:  {
                type: Number,
                required: true
            },
            additionalInfo:  {
                type: String,
                required: true
            }
        },
        payment: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true
        },
        packageId: {
            type: Schema.Types.ObjectId,
            ref: "Package",
            index: true
        },
        staffId: {
            type: Schema.Types.ObjectId,
            ref: "Staff",
            index: true
        },
        images: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);


/*

    subtotal
    adminFee
    totalCost
    bookingUserInformation{
        firstName
        lastName
        emailAddress
        phoneNumber
        Address: {
            address1
            address2
            city
            postalCode
        }
    }
    additionalInformation: {
        completeAddressWith4Corners
        tires
        tireSize
        additionalInfor
    }

*/ 