import express from 'express';
import authGuard from '../middlewears/authGuard';
import userRoutes from './user.route';
import signInRoutes from './signIn.route';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/sign-in', signInRoutes);

// router.get('/tasks', authGuard, (req, res) => res.send('OK'));

export default router;