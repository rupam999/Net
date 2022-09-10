const calendar = require('../controllers/calendar');

module.exports = (router) => {
	router.post('/calendar/post', calendar.storeEvent);
	router.get('/calendar/get', calendar.getCalendarEvent);
};
