import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import logger from '../helpers/logger';

const { Schema } = mongoose;

const USER = 'User';

const UserSchema = new Schema({
	email: { type: String, trim: true, required: true, lowercase: true, unique: true },
	hash_password: { type: String, required: true },
	firstName: { type: String, trim: true },
	lastName: { type: String, trim: true },
	created: { type: Date, default: Date.now },
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: USER }],
	lastActive: { type: Date, default: Date.now }
});

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.hash_password);
}

const UserModel = mongoose.model(USER, UserSchema);

class UserRepository {
	static async createUser(newUser) {
		logger.log("...creating new user", newUser);
		newUser.hash_password = bcrypt.hashSync(newUser.password, 10);
		return await new UserModel(newUser).save();
	};

	static async findUserByEmail(email) {
		return await UserModel.findOne({ email }).populate({ 'path': 'friends' });
	};

	static async findUserById(id) {
		return await UserModel.findById(id).populate({ 'path': 'friends' });
	};

	static async updateUserById(id, newUser) {
		return await UserModel.findOneAndUpdate({ _id: id }, newUser, { new: true }).populate({ 'path': 'friends' });
	}

	static async addFriend(user, newFriend) {
		return await UserModel.findOneAndUpdate(
			{ _id: user.id },
			{ $push: { friends: newFriend.id } },
			{ 'new': true }
		).populate({ 'path': 'friends' });
	}

	static async removeFriend(user, unFriend) {
		return await UserModel.findOneAndUpdate(
			{ _id: user.id },
			{ $pull: { friends: unFriend.id } },
			{ 'new': true }
		).populate({ 'path': 'friends' });
	}

	static async updateLastActiveById(userId) {
		return await UserModel.findOneAndUpdate(
			{ _id: userId }, 
			{ $set: { lastActive: Date.now() } },
			{ new: true }
		).populate({ 'path': 'friends' });
	}

}

class UserDTO {
	constructor({ _id, email, firstName, lastName, friends, lastActive }) {
		this.id = _id;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.lastActive = lastActive;
		this.friends = friends.map(friend => new FriendDTO(friend));
	}
}

class FriendDTO {
	constructor({ _id, email, firstName, lastName, lastActive }) {
		this.id = _id;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.lastActive = lastActive;
	}
}

export { UserModel, UserRepository, UserDTO };