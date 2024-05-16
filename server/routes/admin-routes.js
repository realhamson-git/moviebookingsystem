const express = require('express')
const router = express();
const Controller = require('../controller/admin-controller')

router.get('/users', Controller.getAllUsers )
router.post('/user', Controller.editUser )
router.delete('/user/:userID', Controller.deleteUser )

router.post('/edit-movie/:movieID', Controller.editMovie )
router.delete('/movie/:movieID', Controller.deleteMovie )

router.delete('/show/:showID', Controller.deleteShow )
router.post('/create-show/:id', Controller.createShow )

router.get('/bookings', Controller.getAllBookings )

module.exports = router