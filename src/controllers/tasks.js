const TASK_MODEL = require('../models/taskModel');
const Task = require('mongoose').model('Task');

const getAllTasks = async (req, res) => {
	try {
		const allTasks = await TASK_MODEL.Task.find({});

		if (allTasks) {
			res.json({ message: 'success', tasks: allTasks });
		} else {
			console.log('error');
			res.status(400);
			res.json({
				message: 'error',
				error,
			});
		}
	} catch (error) {
		console.log('Error', error);
		res.status(400).json({
			message: 'Internal Server Error',
		});
	}
};

const getUserTask = async (req, res) => {
	const { email } = req.query;

	try {
		const search = {
			email,
		};

		console.log('SEARCH', search);

		const allTasks = await TASK_MODEL.Task.find({ email });

		if (allTasks) {
			res.json({ message: 'success', tasks: allTasks });
		} else {
			console.log('error');
			res.status(400);
			res.json({
				message: 'error',
				error,
			});
		}
	} catch (error) {
		console.log('Error', error);
		res.status(400).json({
			message: 'Internal Server Error',
		});
	}
};

const postAllTasks = async (req, res) => {
	const { email, title, desc, check = false } = req.body;

	try {
		const task = new TASK_MODEL.Task({
			email,
			title,
			desc,
			check,
		});

		await task.save((err, response) => {
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

const deleteTask = async (req, res) => {
	const { id } = req.body;
	try {
		const task = await TASK_MODEL.Task.deleteOne({ _id: id });
		if (task.deletedCount === 1) {
			res.json({
				message: 'success',
			});
		} else {
			res.json({
				message: 'error',
			});
		}
	} catch (error) {
		console.log('Error', error);
		res.status(400).json({
			message: 'Internal Server Error',
		});
	}
};

const changeTaskBox = async (req, res) => {
	const { id, check } = req.body;
	console.log(id, check);
	try {
		const task = await Task.findByIdAndUpdate(id, {
			check,
		});

		if (task && task._id) {
			res.send({
				msg: 'success',
			});
		} else {
			console.log('Task', task);
			res.send({ msg: 'issue' });
		}
	} catch (error) {
		console.log('Error', error);
		res.status(400).json({
			message: 'Internal Server Error',
		});
	}
};

module.exports = {
	getAllTasks,
	getUserTask,
	postAllTasks,
	deleteTask,
	changeTaskBox,
};
