const DUMMY = require('../controllers/dummy');

module.exports = (router) => {
	router.get('/dummy', DUMMY.getDummy);
};
