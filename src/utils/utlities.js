const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const encryptPassword = async (password) => {
	return await bcrypt.hash(password, 10);
};

const decryptPassword = async (password, hash) => {
	return await bcrypt.compareSync(password, hash);
};

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET);
};

module.exports = {
	encryptPassword,
	decryptPassword,
	generateToken,
};
