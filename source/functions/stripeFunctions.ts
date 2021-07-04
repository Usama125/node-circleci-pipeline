import { Response } from 'express';
import IPackage from '../interfaces/package';
import { v4 as uuidv4 } from 'uuid';
const stripe = require("stripe")("sk_test_gdQLKrPi2wOtKjYTmhxg3YlJ");

const createChargeForExistingCustomer = (res: Response, packge: IPackage, customerId: any, token: any) => {
    return stripe.charges.create({
        amount: packge.price * 100,
        currency: 'usd',
        customer: customerId,
        receipt_email: token.email,
        description: `purchase of ${packge.name}`,
        shipping: {
            name: token.card.name,
            address: {
                country: token.card.address_country
            }
        }
    }).then((result: any) => {
        res.status(200).json(result);
    }).catch((err: any) => {
        console.log(err);
    });
}

const createCustomerAndCharge = (res: Response, packge: IPackage, token: any) => {
    const idempotencyKey = uuidv4();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((customer: any) => {
        stripe.charges.create({
            amount: packge.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${packge.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempotencyKey });
    }).then((result: any) => {
        res.status(200).json(result);
    }).catch((err: any) => {
        console.log(err);
    });
}

export {
    createChargeForExistingCustomer,
    createCustomerAndCharge
}