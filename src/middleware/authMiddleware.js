const jwt = require('jsonwebtoken');
const USER_MODEL = require('../models/userModel');

const skipMiddleWare = ['/', '/api/user/login'];

const middleware = async (req, res, next) => {
	next();
	// if(skipMiddleWare.includes(req.path)) {
	//     next();
	// } else {
	//     const fullToken = req.headers.authorization;
	//     if(!fullToken) {
	//         res.status(401);
	//         res.json({
	//             message: 'Not Acess Token Found'
	//         });
	//     } else {
	//         try {
	//             const token = fullToken.split(' ')[1];
	//             const decode = jwt.verify(token, process.env.TOKEN_SECRET);
	//             req.user = await USER_MODEL.User.findById(decode.id).select('-password')
	//             next();
	//         } catch (err) {
	//             res.status(401);
	//             res.json({
	//                 message: 'Not Authorized to Access This Route'
	//             });
	//         }
	//     }
	// }
};

module.exports = {
	middleware,
};
