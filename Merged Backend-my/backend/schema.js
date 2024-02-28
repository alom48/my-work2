const mongoose=require('mongoose');
const structure=mongoose.Schema;


const addJobSchema = new structure({
    companyName:String,
    email:String,
    phoneNumber:String,
    url:String,
    jobTitle:String,
    category:String,
    jobLocation:String,
    vacancy:Number,
    jobType:String,
    jobShift:String,
    payDetails:String,
    description:String,
    status:String
},{timestamps:true});

module.exports = mongoose.model("job",addJobSchema)