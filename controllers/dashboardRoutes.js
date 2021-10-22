// URL localhost:3001/dashboard
// Required modules
const router = require( 'express' ).Router();
// Required files
const { Blogpost, User } = require( '../models' );
const withAuth = require( '../utils/auth' );
const serialize = require( '../utils/serialize' );

// Home route
router.get( '/', withAuth, async ( req, res ) => {
	try {
		const blogpostData = await Blogpost.findAll( {
			include: [
				{ model: User }
			],
			where: {
				userId: req.session.user_id
			}
		} );

		const blogposts = blogpostData.map( serialize );

		res.render( 'dashboard', {
			blogposts,
			logged_in: req.session.logged_in
		} );

	} catch ( err ) {
		res.status( 500 ).json( err );
	}
} );

// Add new blogpost view
router.get( '/newpost', withAuth, async ( req, res ) => {
	try {

		res.render( 'newBlogpost', {
			logged_in: req.session.logged_in
		} );

	} catch ( err ) {
		res.status( 500 ).json( err );
	}
} );

// Edit blogpost view
router.get( '/:id', withAuth, async ( req, res ) => {
	try {

		const blogpostData = await Blogpost.findByPk( req.params.id );

		const blogpost = blogpostData.get( { plain: true } );

		res.render( 'editBlogpost', {
			blogpost,
			logged_in: req.session.logged_in
		} );

	} catch ( err ) {
		res.status( 500 ).json( err );
	}
} );


// Export
module.exports = router;