const express = require('express')
const Router = express.Router();

const {login, home} = require('../controllers/loginController')


Router.post('/',login)
      .get('/home', home)



module.exports = Router

