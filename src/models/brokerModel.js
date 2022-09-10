const mongoose = require('mongoose');

const brokerSchema = mongoose.Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		uid: {
			type: String,
			required: true,
		},
		val: {
			type: String,
			required: true,
		},
		uname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		utype: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Broker = mongoose.model('Broker', brokerSchema);

module.exports = {
	Broker,
};
