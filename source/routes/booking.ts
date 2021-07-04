import express from 'express';
import controller from '../controllers/booking';
import extractJWT from '../middleware/extractJWT';
import upload from '../functions/fileUpload';

const router = express.Router();

router.post('/create', [ extractJWT, upload.array('images', 3) ],controller.createBooking);
router.get('/get', extractJWT,controller.getAllBookings);
router.delete('/delete/:id', extractJWT,controller.deleteBooking);

export = router;
