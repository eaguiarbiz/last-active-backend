import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/', async (req, res) =>  await userController.signIn(req, res));

export default router;