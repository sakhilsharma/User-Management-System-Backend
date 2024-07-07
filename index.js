const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require("./models/schema.js");
const methodOverride = require("method-override");
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/manage');
}
main().then(()=> console.log("connection succesful"))
.catch((err)=> console.log(err));

app.listen(8080,()=>{
    console.log("listening at the port 8080");
});
app.get("/",(req,res)=>{
    console.log("basic set up done");
    res.send("succes");
})

app.get("/home", async (req,res)=>{
    let players = await users.find();
    
    res.render("home.ejs",{players});
})
app.get("/home/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/home",(req,res)=>{
    let {name,email,gender} = req.body;
    let newUser = new users(
        {name:name,
        email:email,
        gender:gender,
     }
    )
    newUser.save().then((res)=> console.log(res))
    .catch((err)=> console.log(err));
    res.redirect("/home");
})
app.get("/home/:id/edit",async (req,res)=>{
    let { id } = req.params;
    let person = await users.findById(id);
    res.render("edit.ejs",{person});
})
app.patch("/home/:id",(req,res)=>{
    let {name,email,gender} = req.body;
    console.log(req.boby); 
    res.redirect("/home");
})
app.delete("/home/:id", async (req,res)=>{
    let { id } = req.params;
    console.log("delete setup")
    console.log(req.params);
    let userDelete =  await users.findByIdAndDelete(id);
    res.redirect("/home");
})