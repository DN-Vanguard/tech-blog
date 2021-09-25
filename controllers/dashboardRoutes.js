const router = require( 'express' ).Router();
const { Project, User } = require( '../models' );
const withAuth = require( '../utils/auth' );
const serialize = require( '../utils/serialize' );

//DEFAULT
router.get('/', withAuth, async (req, res) => {
	try {
		const projectData = await Project.findAll({
			include: [
				{model: User}
			],
			where: {
				userId: req.session.user_id
			}
		});

		const project = projectData.map(serialize);

		res.render('dashboard', {
			project,
			logged_in: req.session.logged_in
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

// GET NEW PROJECT
router.get( '/newproject', withAuth, async (req, res) => {
	try {

		res.render('newProject', {
			logged_in: req.session.logged_in
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

// EDIT
router.get('/:id', withAuth, async (req, res) => {
	try {

		const projectData = await Project.findByPk(req.params.id);

		const project = projectData.get( {plain: true });

		res.render('editProject', {
			project,
			logged_in: req.session.logged_in
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;