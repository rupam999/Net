const BROKER_MODEL = require('../models/brokerModel');
const Broker = require('mongoose').model('Broker');

const getMonthlyDepositWithdraw = async (req, res) => {
	const { uid, type } = req.query;

	let search;
	if (uid) {
		search = { uid: { $in: [uid] }, val: type };
	} else {
		search = { val: type };
	}

	try {
		const data = await BROKER_MODEL.Broker.aggregate([
			{
				$match: search,
			},
			{
				$group: {
					_id: {
						month: { $month: '$date' },
						// day: { $dayOfMonth: '$date' },
						year: { $year: '$date' },
					},
					totalPrice: { $sum: { $multiply: [{ $toInt: '$amount' }, 1] } },
					count: { $sum: 1 },
				},
			},
		]);

		if (data) {
			res.json({
				message: 'success',
				data,
			});
		} else {
			res.json({
				message: 'No Data Found',
				data,
			});
		}
	} catch (error) {
		console.log('Error', error);
		res.status(400).json({
			message: 'Internal Server Error',
		});
	}
};

const getLeadershipTable = async (req, res) => {
	try {
		const broker = await Broker.aggregate([
			{
				$group: {
					_id: {
						uid: '$uid',
					},
					amount: {
						amount: '$amount',
					},
				},
			},
		]);

		res.send(broker);
	} catch (error) {
		console.log('Error', error);
		res.status(400).json({
			message: 'Internal Server Error',
		});
	}
};

module.exports = {
	getMonthlyDepositWithdraw,
	getLeadershipTable,
};
