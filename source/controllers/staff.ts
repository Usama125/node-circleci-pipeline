import { NextFunction, Request, Response } from 'express';
import Staff from '../models/staff';
import mongoose from 'mongoose';
import makeResponse from '../functions/makeResponse';

const createStaff = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const newStaff = new Staff({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return newStaff.save()
                .then(result => {
                    return makeResponse(res, 201, "Staff Created Successfully", result, false);
                })
                .catch(err => {
                    return makeResponse(res, 400, err.message, null, true);
                })
};

const getAllStaff = (req: Request, res: Response, next: NextFunction) => {     
    Staff.find()
        .exec()
        .then(result => {
            return makeResponse(res, 200, "Staff List", result, false);
        })
        .catch(err => {
            return makeResponse(res, 400, err.message, null, true);
        })
};

const deleteStaff = (req: Request, res: Response, next: NextFunction) => {     
    Staff.deleteOne({ _id: req.params.id }).then(staff => {
        return makeResponse(res, 200, "Staff deleted successfully", null, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

const updateStaff = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;

    const filter = { _id: id };
    const update = { name: name };

    Staff.findOneAndUpdate(filter, update).then(staff => {
        return makeResponse(res, 200, "Staff updated Successfully", staff, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

const getSingleStaff = (req: Request, res: Response, next: NextFunction) => {
    Staff.findById({ _id: req.params.id }).then(staff => {
        return makeResponse(res, 200, "Staff Deleted Successfully", staff, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

export default { 
    createStaff,  
    getAllStaff,
    deleteStaff,
    getSingleStaff,
    updateStaff
};
