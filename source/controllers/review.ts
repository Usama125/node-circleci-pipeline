import { NextFunction, Request, Response } from 'express';
import Review from '../models/review';
import mongoose from 'mongoose';
import makeResponse from '../functions/makeResponse';

const createReview = (req: Request, res: Response, next: NextFunction) => {
    const { 
        name, date, rating, comment, userId, packageId
    } = req.body;

    const newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        name, date, rating, comment, userId, packageId
    });

    return newReview.save()
                .then(result => {
                    return makeResponse(res, 201, "Review Created Successfully", result, false);
                })
                .catch(err => {
                    return makeResponse(res, 400, err.message, null, true);
                })
};

const getReviewsOfAPackage = (req: Request, res: Response, next: NextFunction) => {
    
    const { packageId } = req.params;
    
    Review.find({packageId})
        .exec()
        .then(result => {
            return makeResponse(res, 200, "Reviews", result, false);
        })
        .catch(err => {
            return makeResponse(res, 400, err.message, null, true);
        })
};

const getAllReview = (req: Request, res: Response, next: NextFunction) => {     
    Review.find()
        .populate("userId")
        .populate("packageId")
        .lean()
        .then(result => {
            return makeResponse(res, 200, "All Reviews", result, false);
        })
        .catch(err => {
            return makeResponse(res, 400, err.message, null, true);
        })
};

const deleteReview = (req: Request, res: Response, next: NextFunction) => {     
    Review.deleteOne({ _id: req.params.id }).then(category => {
        return makeResponse(res, 200, "Review deleted successfully", null, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

export default { 
    createReview, 
    getAllReview, 
    getReviewsOfAPackage,
    deleteReview 
};
