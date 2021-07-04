import express from 'express';
import controller from '../controllers/package';
import upload from '../functions/fileUpload';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.post('/create', [ extractJWT, upload.single("imageUrl") ],controller.createPackage);
router.get('/get',extractJWT, controller.getAllPackage);
router.delete('/delete/:id',extractJWT, controller.deletePackage);
router.get('/single/:id', extractJWT, controller.getSinglePackage);
router.put('/update/:id',extractJWT, controller.updatePackage);

export = router;
