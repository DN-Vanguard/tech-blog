const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');
const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true
	});

	await Blogpost.bulkCreate(blogpostData);

	await Comment.bulkCreate(commentData);

	process.exit(0);
};

seedDatabase();