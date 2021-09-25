const router = require('express').Router();
const { User, Project, Comment } = require('../../models');
const withAuth = require( '../../utils/auth' );

// GET ALL
router.post('/', async (req, res) => {
  try {
		const newProject = await Project.findAll( {
			include: [
				{model: User,
					attributes: ['username']},
				{model: Comment,
					include: [
						{model: User,
							attributes: ['username']}
					]}
			]
		});

		res.json(newProject);

	} catch (err) {
		res.status(500).json(err);
	}
} );

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
