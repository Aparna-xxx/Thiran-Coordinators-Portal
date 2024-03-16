const express = require('express')
const Router = express.Router();

const {login, home} = require('../controllers/loginController');
const { attendance } = require('../controllers/attendanceController');
const { winners } = require('../controllers/winnersControllers');


Router.post('/',login)
      .get('/home', home)
      .get('/attendance',attendance)
      .get('/winner',winners)



module.exports = Router

