const Chat = require('../controllers/chat');

module.exports = (router) => {
	router.post('/chat/add', Chat.postMessage);
	router.get('/chat/get', Chat.getMessages);
	// router.get('/chat/demo', Chat.Demo);
};
