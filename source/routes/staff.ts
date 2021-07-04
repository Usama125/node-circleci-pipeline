import express from 'express';
import controller from '../controllers/staff';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.post('/create', extractJWT,controller.createStaff);
router.get('/get',extractJWT, controller.getAllStaff);
router.delete('/delete/:id',extractJWT, controller.deleteStaff);
router.put('/update/:id',extractJWT, controller.updateStaff);
router.get('/single/:id', extractJWT, controller.getSingleStaff);

export = router;
