const User = require('../models/user.model');
const UserService = require('../services/users.services');

class userController {
	async updateUser(req, res) {
		try {
			const { id } = req.params;
			const { _id, password, ...rest } = req.body;

			const userData = await new UserService().userUpdate(id, password, rest);

			res.status(200).json({
				message: 'User updated successfully',
				userData,
			});
		} catch (error) {
            console.log(error);
			res.status(500).json(error);
		}
	}

	async deleteUser(req, res) {
		try {
			const { id } = req.params;
			const userData = await new UserService().userDelete(id);

			res.status(200).json({
				message: 'User deleted successfully',
				userData,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getAllUsers(req, res) {
		try {
			const { limit = 10, from = 0 } = req.query;
			const query = { state: true };

			const [total, users] = await Promise.all([
				User.countDocuments(query),
				User.find(query).limit(Number(limit)).skip(Number(from)),
			]);

			return res.status(200).json({
				total,
				users,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getUser(req, res) {
		try {
			const id = req.params.id;
			const userData = await new UserService().userGet(id);
			res.status(200).json({
				message: 'Success!',
				userData,
			});

		} catch (error) {
			res.status(500).json({
				message: 'Failed',
				error,
			});
		}
	}
}

module.exports = new userController();