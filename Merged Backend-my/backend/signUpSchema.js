const mongoose=require('mongoose');
const structure=mongoose.Schema;


const signupSchema = new structure({
    fName:String,
    lName:String,
    userName:String,
    email:String,
    pass:String
},{timestamps:true});
module.exports = mongoose.model("user",signupSchema)