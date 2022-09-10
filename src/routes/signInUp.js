const SignUpIn = require('../controllers/signInUp');

module.exports = (router) => {
	router.post('/user/register', SignUpIn.register);
	router.post('/user/login', SignUpIn.login);
	router.post('/user/password', SignUpIn.changePassword);
};
