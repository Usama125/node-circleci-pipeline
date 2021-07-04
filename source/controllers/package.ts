import { NextFunction, Request, Response } from 'express';
import Package from '../models/package';
import mongoose from 'mongoose';
import makeResponse from '../functions/makeResponse';
import config from '../config/config';


const createPackage = (req: Request, res: Response, next: NextFunction) => {
    const { 
        name, description, features, price,
        duration, long, lat, categoryId
    } = req.body;

    const newPackage = new Package({
        _id: new mongoose.Types.ObjectId(),
        name, description, features, price,
        duration, long, lat, categoryId,
        imageUrl: config.server.APP_URL + "/" + (( req && req.file && req.file.filename ) ? req.file.filename : ""),
    });

    return newPackage.save()
                .then(result => {
                    return makeResponse(res, 201, "Package Created Successfully", result, false);
                })
                .catch(err => {
                    return makeResponse(res, 400, err.message, null, true);
                });
};

const getAllPackage = (req: Request, res: Response, next: NextFunction) => {
    Package.find({})
        .populate("categoryId")
        .lean()
        .then(result => {
            return makeResponse(res, 200, "All Packages", result, false);
        })
        .catch(err => {
            return makeResponse(res, 400, err.message, null, true);
        })
};

const getSinglePackage = (req: Request, res: Response, next: NextFunction) => {
    Package.findById({ _id: req.params.id }).then(singlePackage => {
        return makeResponse(res, 200, "Packag", singlePackage, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    })
}

const updatePackage = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const filter = { _id: id };
    let update = {};

    if(req && req.file && req.file.filename){
        update = {...req.body, imageUrl: req.file.filename}
    }else {
        update = {...req.body}
    }

    Package.findOneAndUpdate(filter, update).then(newPackage => {
        return makeResponse(res, 200, "Package updated Successfully", newPackage, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

const deletePackage = (req: Request, res: Response, next: NextFunction) => {
    Package.deleteOne({ _id: req.params.id }).then(category => {
        return makeResponse(res, 200, "Package Deleted Successfully", category, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

export default { 
    createPackage, 
    getAllPackage,
    deletePackage,
    getSinglePackage,
    updatePackage
};
