const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');

// GET ALL
router.get('/', async (req, res) => {
	try {
		const userData = await User.findAll({
			include: [
				{ model: Blogpost },
				{ model: Comment }
			]
		});

		res.json(userData);

	} catch (err) {
		res.status(500).json(err);
	}
});

// CREATE
router.post('/', async (req, res) => {
	try {
		const userData = await User.create(req.body);

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});

	} catch (err) {
		res.status(400).json(err);
	}
});

// VALIDATION
router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({ where: { username: req.body.username } });

		if (!userData) {
			res.status(400).json({ message: 'Incorrect email or password, please try again' });

			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: 'Incorrect email or password, please try again' });

			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData,
				message: 'You are now logged in!' });
		});

	} catch (err) {
		res.status(400).json(err);
	}
});

// LOGOUT
router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

// EXPORT
module.exports = router;