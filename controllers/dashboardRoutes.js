const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');
const serialize = require('../utils/serialize');

// DASHBOARD
router.get('/', withAuth, async (req, res) => {
	try {
		const blogpostData = await Blogpost.findAll({
			include: [
				{ model: User }
			],
			where: {
				userId: req.session.user_id
			}
		});

		const blogposts = blogpostData.map(serialize);

		res.render('dashboard', {
			blogposts,
			logged_in: req.session.logged_in
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

// ADD
router.get('/newpost', withAuth, async (req, res) => {
	try {

		res.render('newBlogpost', {
			logged_in: req.session.logged_in
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

// EDIT
router.get('/:id', withAuth, async (req, res) => {
	try {

		const blogpostData = await Blogpost.findByPk(req.params.id);

		const blogpost = blogpostData.get({ plain: true });

		res.render('editBlogpost', {
			blogpost,
			logged_in: req.session.logged_in
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

// EXPORT
module.exports = router;