const express = require('express')
const Router = express.Router();

const {login, home} = require('../controllers/loginController');
const { attendance } = require('../controllers/attendanceController');
const { winners, updateWinners } = require('../controllers/winnersControllers');
const {updateAttendance} = require('../controllers/attendanceController');


Router.post('/',login)
      .get('/home', home)
      .get('/attendance',attendance)
      .get('/winner',winners)
      .post('/updateAttendance',updateAttendance)
      .post('/updateWinner', updateWinners)


module.exports = Router

