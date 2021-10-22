const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET ALL
router.get('/', async (req, res) => {
	try {
		const blogpostData = await Blogpost.findAll({
			include: [
				{ model: User,
					attributes: ['username'] },
				{ model: Comment,
					include: [
						{ model: User,
							attributes: ['username'] }
					] }
			]
		});

		res.json(blogpostData);

	} catch (err) {
		res.status(500).json(err);
	}
});

// GET ONE
router.get('/:id', async (req, res) => {
	try {
		const blogpostData = await Blogpost.findByPk(req.params.id, {
			include: [
				{ model: User,
					attributes: ['username'] },
				{ model: Comment,
					include: [
						{ model: User,
							attributes: ['username'] }
					] }
			]
		});

		res.json(blogpostData);

	} catch (err) {
		res.status(500).json(err);
	}
});

// CREATE COMMENT
router.post('/comment', withAuth, async (req, res) => {
	try {
		const commentData = await Comment.create({
			...req.body,
			userId: req.session.user_id
		});

		res.status(200).json(commentData);

	} catch (err) {
		res.status(400).json(err);
	}
});

// CREATE NEW BLOG POST
router.post('/', withAuth, async (req, res) => {
	try {
		const blogpostData = await Blogpost.create({
			...req.body,
			userId: req.session.user_id
		});

		res.status(200).json(blogpostData);

	} catch (err) {
		res.status(400).json(err);
	}
});

// UPDATE
router.put('/:id', withAuth, async (req, res) => {
	try {
		const blogpostData = await Blogpost.update({
			title: req.body.title,
			content: req.body.content
		},
		{
			where: {
				id: req.params.id
			}
		});

		res.status(200).json(blogpostData);

	} catch (err) {
		res.status(400).json(err);
	}
});

// DELETE
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const blogpostData = await Blogpost.destroy({
			where: {
				id: req.params.id
			}
		});

		res.status(200).json(blogpostData);

	} catch (err) {
		res.status(400).json(err);
	}
});

// EXPORT
module.exports = router;