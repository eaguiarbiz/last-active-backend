import { UserRepository, UserDTO } from '../models/user';
import logger from '../helpers/logger';

export default class UserService {
    static async findUserById(id) {
        try {
            const existingUser = await UserRepository.findUserById(id);
            if (!existingUser) {
                logger.info('user not found');
                throw new Error("User Not Found");
            }
            return new UserDTO(existingUser);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async createUser(user) {
        try {
            const existingUser = await UserRepository.findUserByEmail(user.email);
            if (existingUser) {
                logger.info('user exists', user);
                throw new Error("User Exists")
            }
            const newUser = await UserRepository.createUser(user);
            return new UserDTO(newUser);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async updateUser(user) {
        try {
            const existingUser = await UserRepository.findUserById(user.id);
            if (!existingUser) {
                logger.info('User not found');
                throw new Error("User not found");
            }
            const newUser = await UserRepository.updateUserById(user.id, user);
            logger.info('updated user ', newUser.email);
            return new UserDTO(newUser);
        } catch (e) {
            throw new Error("Cannot update user");
        }
    }

    static async addFriend(userId, friend) {
        try {
            const newFriend = await UserRepository.findUserById(friend.id);
            const user = await UserRepository.findUserById(userId);
            const friendExists = this.friendExists(user, newFriend);
            const sameUser = this.sameUser(user, newFriend);
            if (!user || !newFriend || friendExists || sameUser) {
                logger.info('Cant add friend');
                throw new Error("Error Adding ", friend);
            }

            const updatedUser = await UserRepository.addFriend(user, newFriend);
            logger.info('updated user ', updatedUser.email);

            return new UserDTO(updatedUser);
        } catch (e) {
            console.log("ERROR:     ", e);
            logger.info("ERROR:     ", e);
            throw new Error(e);
        }
    }

    static async removeFriend(userId, friend) {
        try {
            const unFriend = await UserRepository.findUserById(friend.id);
            const user = await UserRepository.findUserById(userId);
            const friendExists = this.friendExists(user, unFriend);
            const sameUser = this.sameUser(user, unFriend);
            if (!user || !unFriend || !friendExists || sameUser) {
                logger.info('Cant delete friend');
                throw new Error("Error Removing ", friend);
            }

            const updatedUser = await UserRepository.removeFriend(user, unFriend);
            logger.info('updated user ', updatedUser.email);

            return new UserDTO(updatedUser);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async updateLastActive(userId) {
        try {
            const user = await UserRepository.findUserById(userId);
            if (!user) {
                logger.info('Cant update user');
                throw new Error("Error updating ", friend);
            }
            const updatedUser = await UserRepository.updateLastActiveById(user.id)
            return new UserDTO(updatedUser)
        } catch (e) {
            throw new Error(e);
        }
    }

    static friendExists(user, newFriend) {
        if (user.friends.length > 0) {
            for (let friend of user.friends) {
                if (this.sameUser(friend, newFriend)) {
                    return true;
                }
            }
        }

        return false;
    }

    static sameUser(user1, user2) {
        if (user1.id.toString() === user2.id.toString()) return true;

        return false;
    }

}
