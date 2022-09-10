const getDummy = async (req, res) => {
	res.send({ msg: 'getting some information!' });
};

module.exports = {
	getDummy,
};
