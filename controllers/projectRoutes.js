const router = require('express').Router();
const {Project, User, Comment} = require('../models');

// SHOW PROJECT WITH COMMENTS
router.get('/:id', async (req, res) => {
	try {
		const projectData = await Project.findByPk(req.params.id, {
			include:[
				{model: User,
					attributes: ['username']},
				{model: Comment,
					include: [
						{model: User,
							attributes: ['username']}
					]}
			]
		});

		const project = projectData.get({ plain: true });

		res.render('singleProject', {
			project,
			logged_in: req.session.logged_in
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;