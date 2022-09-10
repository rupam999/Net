const CALENDAR_MODEL = require('../models/calendarModel');

const storeEvent = async (req, res) => {
	const { start, end, title, color, uid } = req.body;

	try {
		const calendar = new CALENDAR_MODEL.Calendar({
			start,
			end,
			title,
			allDay: true,
			color,
			uid,
		});

		await calendar.save((err, response) => {
			if (err) {
				console.log(err);
				res.json({
					message: 'error',
				});
			} else {
				res.json({
					message: 'success',
				});
			}
		});
	} catch (error) {
		console.log('Error', error);
		res.status(400).json({
			message: 'Internal Server Error',
		});
	}
};

const getCalendarEvent = async (req, res) => {
	const { uid } = req.query;

	const search = {
		uid,
	};

	try {
		const data = await CALENDAR_MODEL.Calendar.find({ ...search });

		console.log('DATA', data, 'UID', uid);

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

module.exports = {
	storeEvent,
	getCalendarEvent,
};
