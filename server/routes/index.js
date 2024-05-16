const express = require('express')
const router = express();
const auth = require('../middleware/auth')

const CommonController = require('../controller/common-controller')
const UserRoutes = require('./user-routes');
const AdminRoutes = require('./admin-routes');

router.use('/user', auth.verify_user, UserRoutes )
router.use('/admin', auth.verify_user, AdminRoutes )

router.route('/movies')
    .get( CommonController.getAllMovies )

router.get('/shows', CommonController.getShows )
router.get('/all-shows', CommonController.getAllShows )

router.get('/show/:showID', CommonController.getMovieShow )
router.get('/show-details/:showID', CommonController.getShowDetails )

router.get('/seats/:showID', auth.verify_user, CommonController.getSeatsInShow )
router.post('/booked', auth.verify_user, CommonController.bookMovie )

router.post('/login', CommonController.login)
router.post('/create-user', CommonController.createUser)

module.exports = router