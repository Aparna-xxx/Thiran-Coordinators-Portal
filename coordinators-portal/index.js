const express = require('express')
const path = require('path')
const {db} = require('./db')
const bodyParser = require('body-parser')
const route = require('./routes/route')
require('dotenv').config()
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT  || 5000;

const ejs = require("ejs");
app.set('view engine', 'ejs');


app.set('view engine', 'ejs');
db();

const root = process.cwd();

app.use(bodyParser.urlencoded({extended: true}));

app.use('/',route);


app.use(express.static(path.join(root , 'public')))

app.listen(PORT, () => {
    console.log(`server is listening to port http://localhost:${PORT}`);
});



