const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');

User.hasMany(Project, {
	foreignKey: 'userId',
	onDelete: 'CASCADE'
});
Project.belongsTo(User, {
	foreignKey: 'userId'
});

User.hasMany(Comment, {
	foreignKey: 'userId',
	onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
	foreignKey: 'userId'
});

Project.hasMany(Comment, {
	foreignKey: 'projectId',
	onDelete: 'CASCADE'
});
Comment.belongsTo(Project, {
	foreignKey: 'projectId'
});

module.exports = {User, Project, Comment};