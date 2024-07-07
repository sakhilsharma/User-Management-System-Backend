const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/manage');
}
main().then(()=> console.log("connection succesful"))
.catch((err)=> console.log(err));

let userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
             required:true,
             maxLength:[60,"email is to long"],
        },
        gender:{
            type:String,
            enum:["male","female","other","Male","Female"]
        },
        status:{
            type:String,
            enum:["active","inactive"],
            default:"active",
        }
    }
)
const users = mongoose.model("User",userSchema);
module.exports = users;