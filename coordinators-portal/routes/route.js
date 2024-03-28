const express = require('express')
const Router = express.Router();

const {login, home} = require('../controllers/loginController');
const { attendance } = require('../controllers/attendanceController');
const { winners, updateWinners } = require('../controllers/winnersControllers');
const {updateAttendance} = require('../controllers/attendanceController');
const {starHome, starAttendance, updateStarAttendance, starWinner, updateStarWinner} = require('../controllers/starController');
const { adminHome, event, star } = require('../controllers/adminController');


Router.post('/',login)
      .get('/home', home)
      .get('/attendance',attendance)
      .get('/winner',winners)
      .post('/updateAttendance',updateAttendance)
      .post('/updateWinner', updateWinners)
      .get('/starHome', starHome)
      .get('/starAttendance', starAttendance)
      .post('/updateStarAttendance', updateStarAttendance)
      .get('/starWinner', starWinner)
      .post('/updateStarWinner', updateStarWinner)
      .get('/adminHome', adminHome)
      .get('/event', event)
      .get('/star', star)

module.exports = Router

