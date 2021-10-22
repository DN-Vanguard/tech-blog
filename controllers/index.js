const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const blogpostRoutes = require('./blogpostRoutes');
const apiRoutes = require('./api');

// ROUTING
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/blogposts', blogpostRoutes);
router.use('/api', apiRoutes);

module.exports = router;