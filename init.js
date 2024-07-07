const users = require("./models/schema.js");
const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/manage');
}
main().then(()=> console.log("connection succesful"))
.catch((err)=> console.log(err));
let allUsers= [
    {
        name:"Sakhil Sharma",
        email:"sakhilsharma123@gmail.com",
        gender:"male",
        status:"active",
    }
]
users.insertMany(allUsers);