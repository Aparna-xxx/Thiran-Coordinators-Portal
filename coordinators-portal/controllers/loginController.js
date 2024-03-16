const {admin} = require('../models/adminSchema')


const express = require('express')
const app = express();

const ejs=require("ejs");
app.set('view engine', 'ejs');

exports.login = async(req,res) => {
    const {name, pwd} = req.body;

    await admin.findOne({name : name})
        .then( (valid) => {
            if(valid){
                console.log(valid)
                if(valid.pwd == pwd){
                    console.log("Authenticated");
                    res.redirect("/home")
                }
                else{
                    alert("Incorrect Password")
                }
            }
            else{
                console.log("Not in db")
                alert("User not found in db")
            }
        })
        .catch((err) =>{
            console.error(error)
        })
}


exports.home = async(req,res) => {
    res.render("details")
}