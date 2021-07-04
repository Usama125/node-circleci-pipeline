import express from 'express';
import controller from '../controllers/category';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.post('/create', extractJWT,controller.createCategory);
router.get('/get',extractJWT, controller.getAllCategories);
router.delete('/delete/:id',extractJWT, controller.deleteCategories);
router.put('/update/:id',extractJWT, controller.updateCategory);
router.get('/single/:id', extractJWT, controller.getSingleCategory);

export = router;
