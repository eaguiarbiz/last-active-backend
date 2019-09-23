import HttpStatus from 'http-status-codes';
import { UserRepository, UserDTO } from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config.json';
import logger from '../helpers/logger';
import UserService from '../services/user.service';

async function get(req, res) {
	try {
		const newUser = await UserService.findUserById(req.params.id);
		return res.status(HttpStatus.ACCEPTED).send(newUser);
	} catch (e) {
		return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

async function getMe(req, res) {
	try {
		const newUser = await UserService.findUserById(req.user.id);
		return res.status(HttpStatus.ACCEPTED).send(newUser);
	} catch (e) {
		return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

async function create(req, res) {
	try {
		const newUser = await UserService.createUser(req.body);

		return res.status(HttpStatus.CREATED).send(newUser);
	} catch (e) {
		logger.info("error creating user: ", req.body);
		return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

async function update(req, res) {
	try {
		const updatedUser = await UserService.updateUser(req.body);
		res.status(HttpStatus.ACCEPTED).send(updatedUser);
	} catch (e) {
		res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

async function addFriend(req, res) {
	try {
		const updatedUser = await UserService.addFriend(req.user.id, req.body);
		res.status(HttpStatus.ACCEPTED).send(updatedUser);
	} catch (e) {
		console.log("ERROR:     ", e);
		logger.info("ERROR:     ", e);
		res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

async function removeFriend(req, res) {
	try {
		const updatedUser = await UserService.removeFriend(req.user.id, req.body);
		res.status(HttpStatus.ACCEPTED).send(updatedUser);
	} catch (e) {
		console.log("ERROR:     ", e);
		logger.info("ERROR:     ", e);
		res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

async function lastActive(req, res) {
	try {
		const updatedUser = await UserService.updateLastActive(req.user.id);
		res.status(HttpStatus.ACCEPTED).send(updatedUser);
	} catch (e) {
		console.log("ERROR:     ", e);
		logger.info("ERROR:     ", e);
		res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

async function signIn(req, res) {
	try {
		const existingUser = await UserRepository.findUserByEmail(req.body.email);
		if (!existingUser) {
			logger.info('user not found');
			return res.status(HttpStatus.BAD_REQUEST).send({ 'message': 'User not found' });
		}
		if (!existingUser.comparePassword(req.body.password)) {
			res.status(HttpStatus.UNAUTHORIZED).json({ 'message': 'Authentication failed. Wrong password' });
		} else {
			const loggedInUser = new UserDTO(existingUser);
			return res.status(HttpStatus.OK).send({ token: jwt.sign(JSON.stringify(loggedInUser), config.secret), user: loggedInUser });
		}
	}
	catch (e) {
		res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
};

export default { get, getMe, create, update, addFriend, removeFriend, lastActive, signIn };
