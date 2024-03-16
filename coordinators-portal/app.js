const express = require("express");
const app=express();
const bp=require("body-parser");
app.use(bp.urlencoded({ extended: true }));


const mongoose=require("mongoose");



const ejs=require("ejs");
app.set('view engine', 'ejs');
app.use(express.static('public'));



mongoose.connect('mongodb://127.0.0.1:27017/Thiran').then(()=>{console.log("Connected to db!")}); 

const my_schema= new mongoose.Schema({
    name:String,
    pwd:String

});




const my_model=mongoose.model('coordinators',my_schema);






app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")

});

app.post("/",(req,res)=>{
    //get variables into js and 
    const u_name=req.body.name;
    const pwd=req.body.pwd;

    my_model.findOne({name: u_name })
    .then((docs)=>{
        if(docs){
        console.log("Result :",docs);
        if(docs.pwd==pwd){
            console.log("Authenticated");
            res.redirect("/home")
        }
        else{
            res.send("Incorrect password, go back and renenter correct password");
        }
        }
        else{
            console.log("Not in db");
            res.send("User not found");
        }
    })
    .catch((err)=>{
        console.log(err);
    });

});

app.post("/updateAttendance", (req, res)=>{
    res.redirect("/attendance");
})

app.get("/home",(req,res)=>{
    res.render("details")
});

app.get("/attendance", (req, res)=>{
    res.render("attendance")
})

app.listen(3000,()=>{
    console.log("Listening on port 3000");
});

