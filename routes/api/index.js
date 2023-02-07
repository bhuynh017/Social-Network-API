// creating express.js and exporting it
const router = require('express').Router();
// requiring two modules user-routes and thought-routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// using routes.
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;