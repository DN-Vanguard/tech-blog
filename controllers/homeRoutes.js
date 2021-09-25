const router = require('express').Router();
const {User, Project} = require('../models');
const serialize = require('../utils/serialize');

//HOME
router.get('/', async (req, res) => {
	try {
		const projectData = await Project.findAll({
			include:[
				{model: User}
			],
			order:[
				['dateCreated', 'DESC']
			]
		});

		const projects = projectData.map(serialize);

		res.render( 'homepage',{
			projects,
			logged_in: req.session.logged_in
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

//SIGNUP
router.get('/signup', async (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('signup');
});

//LOGIN
router.get('/login', async (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

module.exports = router;