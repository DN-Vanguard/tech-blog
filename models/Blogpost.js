const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogpost extends Model {}

Blogpost.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		modelName: 'blogpost',
	}
);

module.exports = Blogpost;