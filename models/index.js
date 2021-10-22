const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

User.hasMany(Blogpost, {
	foreignKey: 'userId',
	onDelete: 'CASCADE'
});
Blogpost.belongsTo(User, {
	foreignKey: 'userId'
});
User.hasMany(Comment, {
	foreignKey: 'userId',
	onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
	foreignKey: 'userId'
});
Blogpost.hasMany(Comment, {
	foreignKey: 'blogpostId',
	onDelete: 'CASCADE'
});
Comment.belongsTo(Blogpost, {
	foreignKey: 'blogpostId'
});

module.exports = { User,
	Blogpost,
	Comment };