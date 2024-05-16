const express = require('express')
const router = express();
const controller = require('../controller/user-controller');

router.route('/user')
    .get( controller.userDetails )
    .post( controller.editProfile )

router.get('/bookings', controller.getBookings )

module.exports = router