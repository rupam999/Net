// import { Server } from 'socket.io';
// import { createServer } from 'http';
const CHAT_MODEL = require('../models/chatModel');

const postMessage = async (req, res) => {
	const { time, msg, name, room } = req.body;

	try {
		const chatMessage = new CHAT_MODEL.Chat({
			time,
			msg,
			name,
			room,
		});

		await chatMessage.save((err, response) => {
			if (err) {
				console.log(err);
				res.send({
					message: 'error',
				});
			} else {
				res.send({
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

const getMessages = async (req, res) => {
	const { room } = req.query;

	const allMessages = await CHAT_MODEL.Chat.find({ room })
		.sort({ time: -1 })
		.limit(25);

	if (allMessages) {
		const newMessages = allMessages.reverse();
		res.send(newMessages);
	} else {
		console.log('ERROR @ allMessages');
		res.status(400);
		res.json({
			message: 'error',
			error,
		});
	}
};

// export const Demo = () => {
// try {
// 	const httpServer = createServer(app);
// 	const io = new Server(httpServer, {
// 		cors: {
// 			origin: 'http://localhost:3000',
// 			methods: ['GET', 'POST'],
// 		},
// 	});
// 	io.on('connection', (socket) => {
// 		// ...
// 	});
// 	httpServer.listen(3000);
// } catch (error) {}
// };

module.exports = {
	postMessage,
	getMessages,
};
