import { NextFunction, Request, Response } from 'express';
import Booking from '../models/booking';
import mongoose from 'mongoose';
import makeResponse from '../functions/makeResponse';
import Package from '../models/package';
import { createChargeForExistingCustomer, createCustomerAndCharge } from '../functions/stripeFunctions';
import config from '../config/config';

const stripe = require("stripe")("sk_test_gdQLKrPi2wOtKjYTmhxg3YlJ");

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    const { 
        userId, packageId, staffId,
        selectedDate, selectedTime,
        subTotal, adminFee, totalCost,
        bookingUserInformation, additionalInformation,
        payment, token
    } = req.body;

    var myfiles = JSON.parse(JSON.stringify(req.files))
    const images = myfiles.map(( file:any ) => config.server.APP_URL + "/" + file.filename );

    // Do Stripe payment
    if(payment){
        Package.findById(packageId).then(async packg => {
            if(packg){
                const customers = await stripe.customers.list();
                if(customers.data.length > 0) {
                    const customerExist = customers.data.filter((customer : any) => customer.email === token.email);
                        if(customerExist && customerExist.length > 0){
                            // Customer exists Before
                            createChargeForExistingCustomer(res, packg, customerExist[0].id, token);
                        }else {
                            // Create New Customer and charge 
                            createCustomerAndCharge(res, packg, token);
                        }
                }
            }
        }).catch(err => {
            return makeResponse(res, 400, err.message, null, true);
        })
    }

    const newBooking = new Booking({
        _id: new mongoose.Types.ObjectId(),
        userId, packageId, staffId,
        selectedDate, selectedTime,
        subTotal, adminFee, totalCost,
        additionalInformation, bookingUserInformation,
        payment: payment, status: payment ? "Payment Done" : "Payment Pending",
        images
    });

    return newBooking.save()
                .then(result => {
                    return makeResponse(res, 201, "Booking Created Successfully", result, false);
                })
                .catch(err => {
                    return makeResponse(res, 400, err.message, null, true);
                });
};

const getAllBookings = (req: Request, res: Response, next: NextFunction) => {
    Booking.find({})
        .lean()
        .then(result => {
            return makeResponse(res, 200, "All Bookings", result, false);
        })
        .catch(err => {
            return makeResponse(res, 400, err.message, null, true);
        })
};

const deleteBooking = (req: Request, res: Response, next: NextFunction) => {
    Booking.deleteOne({ _id: req.params.id }).then(category => {
        return makeResponse(res, 200, "Booking Deleted Successfully", category, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

export default { 
    createBooking,
    getAllBookings,
    deleteBooking
};
