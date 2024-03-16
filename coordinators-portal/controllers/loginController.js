const { admin } = require('../models/adminSchema');
const express = require('express');
const app = express();
const ejs = require("ejs");

app.set('view engine', 'ejs');

exports.login = async (req, res) => {
    const { name, pwd } = req.body;
    console.log(name,pwd)

    try {
        const valid = await admin.findOne({ name: name });

        if (valid) {
            console.log(valid);
            if (valid.pwd == pwd) {
                console.log("Authenticated");
                res.redirect("/home");
            } else {
                res.send("Incorrect Password");
            }
        } else {
            console.log("Not in db");
            res.send("User not found in db");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.home = async (req, res) => {
    try {
        res.render("details");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
