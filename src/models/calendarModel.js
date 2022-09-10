const mongoose = require('mongoose');

const calendarSchema = mongoose.Schema(
	{
		start: {
			type: Date,
			required: true,
		},
		end: {
			type: Date,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		allDay: {
			type: Boolean,
			default: true,
		},
		color: {
			type: String,
			default: 'green',
		},
		uid: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = {
	Calendar,
};
