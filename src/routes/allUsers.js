const agents = require('../controllers/allUsers');

module.exports = (router) => {
	router.get('/user/all', agents.allUsers);
	router.get('/user/individual', agents.getUserDetails);
};
