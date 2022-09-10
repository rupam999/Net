const Broker = require('../controllers/broker');

module.exports = (router) => {
	router.post('/broker/add', Broker.registerBroker);
	router.get('/broker/get', Broker.getBrokerData);
	router.get('/broker/range', Broker.getBrokerRangeData);
	router.get('/broker/getAmount', Broker.getMonthAmount);
	router.post('/broker/remove', Broker.deleteData);
	router.post('/broker/withdraw', Broker.withdrawAmount);
	router.get('/broker/today', Broker.getTodayData);
	router.get('/broker/customer', Broker.getCustomerData);
	router.get('/broker/all', Broker.getAllBrokersData);
	router.get('/broker/closer', Broker.getAllClosersData);
	router.get('/broker/closer/today', Broker.getAllClosersDataToday);
};
