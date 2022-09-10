const BROKER_MODEL = require('../models/brokerModel');
const AMOUNT_MODEL = require('../models/userAmountModel');
const USER_MODEL = require('../models/userModel');

const registerBroker = async (req, res) => {
	const { amount, brand, date, id, name, type, uid, val, uname, email, utype } =
		req.body;

	const broker = new BROKER_MODEL.Broker({
		amount: +amount,
		brand,
		date,
		id,
		name,
		type,
		uid,
		val,
		uname,
		email,
		utype,
	});

	const amountModel = new AMOUNT_MODEL.Amount({
		id,
		agent: uid,
		amount,
	});

	const search = {
		id,
		agent: uid,
	};

	try {
		const oldUserData = await AMOUNT_MODEL.Amount.find({ ...search });
		console.log('usre', oldUserData);
		if (oldUserData && oldUserData.length > 0) {
			try {
				const data = await AMOUNT_MODEL.Amount.findById(oldUserData[0]._id);

				if (data) {
					data.amount = Number(data.amount) + Number(amount);

					await data.save(async (err, response) => {
						if (err) {
							console.log(err);
							res.status(400);
							res.json({
								message: 'No Data Found',
							});
						} else {
							await broker.save((err, response) => {
								if (err) {
									console.log(err);
									res.json({
										message: 'Duplicate Data Exists',
									});
								} else {
									console.log(response);
									res.json({
										message: 'success',
									});
								}
							});
						}
					});
				} else {
					res.status(400);
					res.json({
						message: 'No Data Found',
					});
				}
			} catch (err) {
				console.log('error', err);
				res.status(400);
				res.json({
					message: 'No Data Found',
				});
			}
		} else {
			await amountModel.save(async (err, response) => {
				if (err) {
					console.log('error', err);
					res.status(400);
					res.send({
						message: 'Internal Server Error',
					});
				} else {
					await broker.save((err, response) => {
						if (err) {
							console.log(err);
							res.json({
								message: 'Duplicate Data Exists',
							});
						} else {
							// console.log(response);
							console.log('NEW ENTRY ADDED');
							res.json({
								message: 'success',
							});
						}
					});
				}
			});
		}
	} catch (error) {
		console.log('error', err);
		res.status(400);
		res.json({
			message: 'No Data Found',
		});
	}
};

const withdrawAmount = async (req, res) => {
	const { uid, id, amount, date, name, brand, type, val, uname, email, utype } =
		req.body;

	const broker = new BROKER_MODEL.Broker({
		amount: +amount,
		brand,
		date,
		id,
		name,
		type,
		uid,
		val,
		uname,
		email,
		utype,
	});

	const search = {
		id,
		agent: uid,
	};

	try {
		const oldUserData = await AMOUNT_MODEL.Amount.find({ ...search });
		console.log('user', oldUserData);
		if (oldUserData && oldUserData.length > 0) {
			try {
				const data = await AMOUNT_MODEL.Amount.findById(oldUserData[0]._id);

				if (data) {
					if (Number(data.amount) - Number(amount) < 0) {
						res.json({
							message: 'Limit',
						});
					} else {
						data.amount = Number(data.amount) - Number(amount);

						await data.save(async (err, response) => {
							if (err) {
								console.log(err);
								res.status(400);
								res.json({
									message: 'No Data Found',
								});
							} else {
								await broker.save((err, response) => {
									if (err) {
										console.log(err);
										res.json({
											message: 'Duplicate Data Exists',
										});
									} else {
										console.log(response);
										res.json({
											message: 'success',
										});
									}
								});
							}
						});
					}
				} else {
					res.status(400);
					res.json({
						message: 'No Data Found',
					});
				}
			} catch (err) {
				console.log('error', err);
				res.status(400);
				res.json({
					message: 'No Data Found',
				});
			}
		} else {
			res.json({
				message: 'No User Found',
			});
		}
	} catch (error) {
		console.log('error', err);
		res.status(400);
		res.json({
			message: 'No Data Found',
		});
	}
};

const getBrokerData = async (req, res) => {
	const { date, uid } = req.query;

	const search = {
		date: new Date(date),
		uid: uid,
	};

	try {
		const data = await BROKER_MODEL.Broker.find({ ...search });

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
	} catch (err) {
		console.log('error', err);
		res.json({
			message: 'No Data Found',
			data,
		});
	}
};

const getBrokerRangeData = async (req, res) => {
	const { startDate, endDate, uid } = req.query;

	const search = {
		date: { $gte: new Date(startDate), $lt: new Date(endDate) },
		uid: uid,
	};

	const data = await BROKER_MODEL.Broker.find({ ...search });

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
};

const getMonthAmount = async (req, res) => {
	const { uid = '' } = req.query;
	const date = new Date();
	const month = date.getMonth() + 1;
	const startDay = '01';
	const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	const year = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getFullYear();

	const startMonth =
		year.toString() + '-' + month.toString() + '-' + startDay.toString();
	const endMonth =
		year.toString() + '-' + month.toString() + '-' + endDay.toString();

	let search;

	if (uid) {
		search = {
			date: { $gte: new Date(startMonth), $lt: new Date(endMonth) },
			uid: uid,
		};
	} else {
		search = {
			date: { $gte: new Date(startMonth), $lt: new Date(endMonth) },
		};
	}

	try {
		const data = await BROKER_MODEL.Broker.find({ ...search });

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
	} catch (err) {
		console.log('error', err);
		res.json({
			message: 'No Data Found',
			data,
		});
	}
};

const getTodayData = async (req, res) => {
	const { uid = '' } = req.query;
	console.log('UUID', uid);
	const date = new Date();
	const month = date.getMonth() + 1;
	let todayMonth;
	if (month <= 9) {
		todayMonth = '0' + month.toString();
	} else {
		todayMonth = month;
	}
	const startDay = date.getDate();
	let todayDay;
	if (startDay <= 9) {
		todayDay = '0' + startDay.toString();
	} else {
		todayDay = startDay;
	}
	const year = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getFullYear();

	const startMonth =
		year.toString() + '-' + todayMonth.toString() + '-' + todayDay.toString();

	let search;

	if (uid) {
		search = {
			date: startMonth,
			uid: uid,
		};
	} else {
		search = {
			date: startMonth,
		};
	}

	try {
		const data = await BROKER_MODEL.Broker.find({ ...search });

		console.log(data, startMonth);

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
	} catch (err) {
		console.log('error', err);
		res.json({
			message: 'No Data Found',
			data,
		});
	}
};

const deleteData = async (req, res) => {
	const { id, userId, agentId, amount } = req.body;

	// console.log('134', id, userId, agentId, amount);

	try {
		const data = await BROKER_MODEL.Broker.findById(id);

		if (data) {
			const search = {
				id: userId,
				agent: agentId,
			};

			try {
				const oldUserData = await AMOUNT_MODEL.Amount.find({ ...search });
				console.log('user', oldUserData);
				if (oldUserData && oldUserData.length > 0) {
					try {
						const newData = await AMOUNT_MODEL.Amount.findById(
							oldUserData[0]._id
						);
						if (newData) {
							if (Number(newData.amount) - Number(amount) < 0) {
								res.json({
									message: 'Limit',
								});
							} else {
								newData.amount = Number(newData.amount) - Number(amount);
								await newData.save(async (err, response) => {
									if (err) {
										console.log(err);
										res.status(400);
										res.json({
											message: 'No Data Found',
										});
									} else {
										await data.remove((err, response) => {
											if (err) {
												console.log('error', err);
												res.status(400);
												res.send({
													message: 'Internal Server Error',
												});
											} else {
												// console.log(response);
												res.json({
													message: 'success',
												});
											}
										});
									}
								});
							}
						} else {
							res.status(400);
							res.send({
								message: 'Internal Server Error',
							});
						}
					} catch (err) {
						console.log('error', err);
						res.status(400);
						res.send({
							message: 'Internal Server Error',
						});
					}
				} else {
					res.status(400);
					res.send({
						message: 'Internal Server Error',
					});
				}
			} catch (err) {
				console.log('error', err);
				res.status(400);
				res.send({
					message: 'Internal Server Error',
				});
			}
		} else {
			res.status(400);
			res.send({
				message: 'Internal Server Error',
			});
		}
	} catch (err) {
		console.log('error', err);
		res.status(400);
		res.send({
			message: 'Internal Server Error',
		});
	}
};

const getCustomerData = async (req, res) => {
	const { id } = req.query;
	const search = {
		id,
	};

	try {
		const data = await BROKER_MODEL.Broker.find({ ...search });

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
		console.log('error', err);
		res.status(400);
		res.send({
			message: 'Internal Server Error',
		});
	}
};

const getAllBrokersData = async (req, res) => {
	const { type = 'agent' } = req.query;
	try {
		const currentMonth = new Date().getMonth() + 1;
		const currentYear = new Date().getFullYear();

		const result = await BROKER_MODEL.Broker.aggregate([
			{
				$match: {
					val: 'deposit',
					utype: type,
					$expr: {
						$and: [
							{ $eq: [currentMonth, { $month: '$date' }] },
							{ $eq: [currentYear, { $year: '$date' }] },
						],
					},
				},
			},
			{
				$group: {
					_id: '$uname',
					total: {
						$sum: '$amount',
					},
				},
			},
		]).sort({ total: 'desc' });
		const result2 = await BROKER_MODEL.Broker.aggregate([
			{
				$match: {
					val: 'withdraw',
					utype: type,
					$expr: {
						$and: [
							{ $eq: [currentMonth, { $month: '$date' }] },
							{ $eq: [currentYear, { $year: '$date' }] },
						],
					},
				},
			},
			{
				$group: {
					_id: '$uname',
					total: {
						$sum: '$amount',
					},
				},
			},
		]);
		res.send({
			deposit: result,
			withdraw: result2,
		});
	} catch (error) {
		console.log('error', error);
		res.status(400);
		res.send({
			message: 'Internal Server Error',
		});
	}
};

const getAllClosersData = async (req, res) => {
	const { type = 'closer' } = req.query;
	try {
		const result = await BROKER_MODEL.Broker.aggregate([
			{
				$match: {
					val: 'deposit',
					utype: type,
				},
			},
			{
				$group: {
					_id: '$uname',
					count: { $sum: 1 },
				},
			},
		]).sort({ count: 'desc' });
		res.send({
			deposit: result,
		});
	} catch (error) {
		console.log('error', error);
		res.status(400);
		res.send({
			message: 'Internal Server Error',
		});
	}
};

const getAllClosersDataToday = async (req, res) => {
	const { uid, type = 'closer' } = req.query;
	try {
		const result = await BROKER_MODEL.Broker.aggregate([
			{
				$match: {
					val: 'deposit',
					utype: type,
					uid: uid,
				},
			},
			{
				$group: {
					_id: '$uname',
					count: { $sum: 1 },
				},
			},
		]).sort({ count: 'desc' });
		res.send({
			deposit: result,
		});
	} catch (error) {
		console.log('error', error);
		res.status(400);
		res.send({
			message: 'Internal Server Error',
		});
	}
};

module.exports = {
	registerBroker,
	withdrawAmount,
	getBrokerData,
	getBrokerRangeData,
	getMonthAmount,
	deleteData,
	getTodayData,
	getCustomerData,
	getAllBrokersData,
	getAllClosersData,
	getAllClosersDataToday,
};
