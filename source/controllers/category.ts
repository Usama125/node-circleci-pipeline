import { NextFunction, Request, Response } from 'express';
import Category from '../models/category';
import Package from '../models/package';
import mongoose from 'mongoose';
import makeResponse from '../functions/makeResponse';

const createCategory = (req: Request, res: Response, next: NextFunction) => {
    let { name } = req.body;

    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return category.save()
                .then(result => {
                    return makeResponse(res, 201, "Category Created Successfully", result, false);
                })
                .catch(err => {
                    return makeResponse(res, 400, err.message, null, true);
                })
};

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    let categories: any = [];

    await Category.find()
        .exec()
        .then(result => {
            categories = result;
        })
        .catch(err => {
            return makeResponse(res, 400, err.message, null, true);
        })

    if(categories.length > 0){
        const response: any = [];
        var promises = categories.map(async (cat: any) => {
                await Package.find({categoryId: cat._id}).then(pack => {
                    response.push({
                        _id: cat._id,
                        name: cat.name,
                        packages: pack
                    });
                }).catch(err => {
                    return makeResponse(res, 400, err.message, null, true);
                })
            })
        Promise.all(promises).then(() => {
            return makeResponse(res, 200, "All Categories", response, false);
        }).catch(err => {
            return makeResponse(res, 400, err.message, null, true);
        })
    }
};

const deleteCategories = (req: Request, res: Response, next: NextFunction) => {
    Category.deleteOne({ _id: req.params.id }).then(category => {
        return makeResponse(res, 200, "Category Deleted Successfully", null, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

const updateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;

    const filter = { _id: id };
    const update = { name: name };

    Category.findOneAndUpdate(filter, update).then(category => {
        return makeResponse(res, 200, "Category updated Successfully", category, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

const getSingleCategory = (req: Request, res: Response, next: NextFunction) => {
    Category.findById({ _id: req.params.id }).then(category => {
        return makeResponse(res, 200, "Category Deleted Successfully", category, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

export default {
    getAllCategories, 
    createCategory,
    deleteCategories,
    updateCategory,
    getSingleCategory 
};
