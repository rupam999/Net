const USER_MODEL = require('../models/userModel');
const utilits = require('../utils/utlities');

const register = async (req, res) => {
	const { name, email, password, userType = 'agent' } = req.body;

	const hashPassword = await utilits.encryptPassword(password);

	const user = new USER_MODEL.User({
		name,
		email,
		password: hashPassword,
		userType,
	});

	await user.save((err, response) => {
		if (err) {
			console.log(err);
			res.json({
				message: 'User Exists',
			});
		} else {
			const token = utilits.generateToken(response._id);
			res.json({
				message: 'success',
				id: response._id,
				name: response.name,
				email: response.email,
				userType: response.userType,
				token,
			});
		}
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	USER_MODEL.User.findOne({ email }, async (err, result) => {
		if (err) {
			// console.log(err);
			res.status(400);
			res.send({
				message: 'Internal Server Error',
			});
		} else {
			// console.log(result);
			if (result) {
				try {
					const passwordResult = await utilits.decryptPassword(
						password,
						result.password
					);
					if (passwordResult) {
						const token = utilits.generateToken(result._id);
						res.json({
							message: 'success',
							id: result._id,
							name: result.name,
							email: result.email,
							userType: result.userType,
							token,
						});
					} else {
						res.json({
							message: 'Wrong Password',
						});
					}
				} catch (err) {
					// console.log(err);
					res.status(400);
					res.json({
						message: 'Internal Server Error',
					});
				}
			} else {
				res.json({
					message: 'No User Found',
				});
			}
		}
	});
};

const changePassword = async (req, res) => {
	const { password, uid } = req.body;

	const hashPassword = await utilits.encryptPassword(password);

	try {
		const oldData = await USER_MODEL.User.findById(uid);
		if (oldData) {
			oldData.name,
				oldData.email,
				(oldData.password = hashPassword),
				oldData.userType;

			await oldData.save((err, response) => {
				if (err) {
					console.log(err);
					res.json({
						message: 'User Not Exists',
					});
				} else {
					res.json({
						message: 'success',
					});
				}
			});
		}
	} catch (err) {
		console.log('password error', err);
		res.status(400);
		res.send({
			message: 'Internal Server Error',
		});
	}
};

module.exports = {
	register,
	login,
	changePassword,
};
