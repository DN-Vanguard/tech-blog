const router = require('express').Router();
const { User, Project, Comment } = require('../../models');
const withAuth = require( '../../utils/auth' );

// GET ALL
router.post('/', async (req, res) => {
  try {
		const newProject = await Project.findAll( {
			include: [
				{model: User,
					attributes: ['user']},
				{model: Comment,
					include: [
						{model: User,
							attributes: ['user']}
					]}
			]
		});

		res.json(newProject);

	} catch (err) {
		res.status(500).json(err);
	}
} );

// GET ONE
router.get( '/:id', async (req, res) => {
	try {
		const newProject = await Project.findByPk(req.params.id, {
			include: [
				{model: User,
					attributes: ['user']},
				{model: Comment,
					include: [
						{model: User,
							attributes: ['user']}
					]}
			]
		});

		res.json(newProject);

	} catch (err) {
		res.status(500).json(err);
	}
});

// CREATE NEW COMMENT
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

// CREATE NEW PROJECT
router.post('/', withAuth, async (req, res) => {
	try {
		const newProject = await Project.create({
			...req.body,
			userId: req.session.user_id
		});

		res.status(200).json(newProject);

	} catch (err) {
		res.status(400).json(err);
	}
});

// UPDATE PROJECT
router.put('/:id', withAuth, async (req, res) => {
	try {
		const newProject = await Project.update({
			title: req.body.title,
			content: req.body.content
		},
		{
			where: {
				id: req.params.id
			}
		});

		res.status(200).json(newProject);

	} catch (err) {
		res.status(400).json(err);
	}
});

// DELETE
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
