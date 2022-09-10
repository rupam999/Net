const USER_MODEL = require('../models/userModel');
const utilits = require('../utils/utlities');

const allUsers = async (req, res) => {
	const { type = 'agent' } = req.query;
	const allAgent = await USER_MODEL.User.find({ userType: type });

	if (allAgent) {
		res.send(allAgent);
	} else {
		console.log('ERROR @ allUsers');
		res.status(400);
		res.json({
			message: 'error',
			error,
		});
	}
};

const getUserDetails = async (req, res) => {
	const { _id } = req.query;
	try {
		const user = await USER_MODEL.User.findById({ _id });
		const employee = {
			name: user.name,
			type: user.userType,
		};
		res.json(employee);
	} catch (error) {
		console.log('ERROR @ getUserDetails', error);
		res.status(400);
		res.json({
			message: 'error',
			error,
		});
	}
};

module.exports = {
	allUsers,
	getUserDetails,
};
