import express from 'express';
import authGuard from '../middlewears/authGuard';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/register', async (req, res) =>  await userController.create(req, res));

router.put('/', authGuard, async (req, res) =>  await userController.update(req, res));
router.get('/me', authGuard, async (req, res) => await userController.getMe(req, res));
router.get('/:id',authGuard, async (req, res) => await userController.get(req, res));
router.post('/follow', authGuard, async (req, res) =>  await userController.addFriend(req, res));
router.post('/unfollow', authGuard, async (req, res) =>  await userController.removeFriend(req, res));
router.post('/last-active', authGuard, async (req, res) =>  await userController.lastActive(req, res));


export default router;