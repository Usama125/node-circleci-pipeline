import express from 'express';
import controller from '../controllers/review';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.post('/create', extractJWT,controller.createReview);
router.get('/get',extractJWT, controller.getAllReview);
router.get('/get/:packageId',extractJWT, controller.getReviewsOfAPackage);
router.delete('/delete/:id',extractJWT, controller.deleteReview);

export = router;
