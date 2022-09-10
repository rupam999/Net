const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const expressStatusMonitor = require('express-status-monitor');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();
const router = express.Router();

/****************DOTENV****************/
const dotenv = require('dotenv');
dotenv.config({
	path: path.join(__dirname, '.env'),
});

/****************MULTER****************/
const multer = require('multer');
const upload = multer({
	dest: path.join(__dirname, 'uploads'),
});

/** **************CROS*************** */
app.use(
	cors({
		origin: '*',
	})
);
app.options('*', cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

/****************TOKEN****************/
const { middleware } = require('./middleware/authMiddleware');
app.use(middleware);

router.get('/', (req, res) => {
	res.json({
		msg: 'Server is running!',
	});
});

router.get('/test', (req, res) => {
	res.json({
		hello: 'test!',
	});
});

app.use(`/.netlify/functions/api`, router);

/***************************************************************/
/************************ALL Routes****************************/
/*************************************************************/
const SignUpIn = require('./routes/signInUp');
const Users = require('./routes/allUsers');
const Broker = require('./routes/broker');
const Tasks = require('./routes/tasks');
const Calendar = require('./routes/calenndar');
const Graph = require('./routes/graphData');
const Chat = require('./routes/chat');
const Dummy = require('./routes/dummy');

Dummy(router);
SignUpIn(router);
Users(router);
Broker(router);
Tasks(router);
Calendar(router);
Graph(router);
Chat(router);

module.exports = app;
module.exports.handler = serverless(app);
