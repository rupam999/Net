const tasks = require('../controllers/tasks');

module.exports = (router) => {
	router.get('/tasks/get', tasks.getAllTasks);
	router.get('/tasks/separate', tasks.getUserTask);
	router.post('/tasks/post', tasks.postAllTasks);
	router.post('/tasks/delete', tasks.deleteTask);
	router.post('/tasks/update', tasks.changeTaskBox);
};
