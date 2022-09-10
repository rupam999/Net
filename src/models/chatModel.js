const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
	{
		time: { type: Date, default: Date.now },
		msg: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		room: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = {
	Chat,
};
