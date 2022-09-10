const graph = require('../controllers/graphData');

module.exports = (router) => {
	router.get('/graph/get', graph.getMonthlyDepositWithdraw);
	router.get('/graph/leader', graph.getLeadershipTable);
};
