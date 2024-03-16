const express = require('express')
const path = require('path')
const {db} = require('./db')
const bodyParser = require('body-parser')
const route = require('./routes/route')

<<<<<<< HEAD
const app = express();
const PORT = 8000;

const ejs = require("ejs");
app.set('view engine', 'ejs');

=======
const ejs=require("ejs");


const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
>>>>>>> b28a791eed937c6fa7ac2045a65caaf22a4fd38d
db();

const root = process.cwd();
console.log(root)

app.use(bodyParser.urlencoded({extended: true}));

app.use('/',route);


app.use(express.static(path.join(root , 'public')))

app.listen(PORT, () => {
    console.log(`server is listening to port http://localhost:${PORT}`);
});



