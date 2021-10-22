const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogpostRoutes = require('./blogpostRoutes');

// ROUTING
router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);

// EXPORT
module.exports = router;