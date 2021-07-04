import { Document } from 'mongoose';

export default interface IBooking extends Document {
    userId: string;
    packageId: string;
    staffId: string;
    selectedDate: string;
    selectedTime: string;
    subtotal: number,
    adminFee: number,
    totalCost: number
    bookingUserInformation: {
        firstName: string,
        lastName: string,
        emailAddress: string,
        phoneNumber: string
        address: {
            address1: string,  
            address2: string,
            city: string,
            postalCode: string
        }
    },
    additionalInformation: {
        completeAddressWith4Corners: string,
        tires: number,
        tireSize: number,
        additionalInfo: string
    },
    payment: boolean;
    status: string;
    images: string[];
}
