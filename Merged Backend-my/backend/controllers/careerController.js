const addJobSchema=require('../schema');
const signUpSchema=require('../signUpSchema');
const jwt=require('jsonwebtoken');
const validator=require('validator');

const createToken=(_id)=>{
    return jwt.sign({_id},"abcdefggfedcba",{expiresIn:'3d'})
 }

const allJob=async (req,res)=>{
    const jobs=await addJobSchema.find({});
    res.send(jobs);
}

const addJob=async (req,res)=>{
    const {
        companyName,
        email,
        phoneNumber,
        url,
        jobTitle,
        category,
        jobLocation,
        vacancy,
        jobShift,
        jobType,
        payDetails,
        description,
        status
    }=req.body
    try{
        const response =await addJobSchema.create({companyName,email,phoneNumber,url,jobTitle,category,jobLocation,vacancy,jobShift,jobType,payDetails,description,status})
        res.json(response)
    }
    catch(err)
    {
        res.json(err);
    }
}

const findByCategory=async (req,res)=>{
    const jobs = await addJobSchema.find({category:`${req.params.category}`});
    res.send(jobs);
}

const login = async (req,res)=>{
    const {userName,pass}=req.body;
    const user = await signUpSchema.findOne({userName},'pass')
    let emptyFields=[]
    if(validator.isEmpty(userName))
    {
        emptyFields.push("userName");
    }
    if(validator.isEmpty(pass))
    {
        emptyFields.push("pass");
    }
    if(emptyFields.length>0)
    {
        res.json({msg:"All fields must be filled",emptyFields});
    }
    else
    {
        if(user)
        {
            if(pass===user.pass)
            {
                const token=createToken("12345");
                res.json({userName,token});
            }
            else
            {
                emptyFields.push("pass");
                res.json({msg:"Incorrect Password",emptyFields});
            }
        }
        else
        {
            emptyFields.push("userName");
            emptyFields.push("pass");
            res.json({msg:"Account doesn't exist",emptyFields});
        }
    }

}

const signUp=async (req,res)=>{
    const {fName,lName,userName,email,pass,conPass}=req.body;
    let emptyFields=[];
    let invalidFields=[];
    if(!fName)
    {
        emptyFields.push("fName");
    }
    else
    {
        if(!validator.isAlpha(fName))
        {
            invalidFields.push("invalidFname");
        }
    }
    if(!lName)
    {
        emptyFields.push("lName");
    }
    else
    {
        if(!validator.isAlpha(lName))
        {
            invalidFields.push("invalidLname");
        }
    }
    if(validator.isEmpty(userName))
    {
        emptyFields.push("userName");
    }
    if(validator.isEmpty(email))
    {
        emptyFields.push("email");
    }
    else
    {
        if(!validator.isEmail(email))
        {
            invalidFields.push("invalidEmail");
        }
    }
    if(validator.isEmpty(pass)||validator.isEmpty(conPass))
    {
        emptyFields.push("pass","conPass");
    }
    else
    {
        if(!validator.isStrongPassword(pass))
        {
            invalidFields.push("invalidPass");
        }
    }
    if(!(pass===conPass))
    {
        emptyFields.push("pass","conPass");
        res.json({msg:"Passwords not matching",emptyFields});
    }
    else if(emptyFields.length>0||invalidFields.length>0)
    {
        if(invalidFields.includes("invalidFname"))
        {
            invalidFields.push("fName");
            res.json({msg:"Invalid name format",invalidFields});
        }
        else if(invalidFields.includes("invalidLname"))
        {
            invalidFields.push("lName");
            res.json({msg:"Invalid name format",invalidFields});
        }
        else if(invalidFields.includes("invalidEmail"))
        {
            invalidFields.push("email");
            res.json({msg:"Invalid email address",invalidFields});
        }
        else if(invalidFields.includes("invalidPass"))
        {
            invalidFields.push("pass");
            res.json({msg:"Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one digit and a special character",invalidFields});
        } 
        else
        {
            res.json({msg:"All fields must be filled",emptyFields});
        }
    }
    else{
    const ifExist = await signUpSchema.findOne({userName});
    if(ifExist)
    {
        emptyFields.push("userName");
        res.json({msg:"Account already exists",emptyFields});
    }
    else
    {
    try{
        const token=createToken("12345");
        //const response=await signUpSchema.create({fName,lName,userName,email,pass})
        res.json({userName,token});
    }
    catch(err)
    {
        res.json(err);
    }
    }
}
}
const status = async (req,res)=>{
    const response = await addJobSchema.find({status:req.params.status})
    res.json(response);
}
const updateStatus = async (req,res)=>{
    //const {status}=req.body
    const response = await addJobSchema.findOneAndUpdate({_id:req.params.id},
        {
        status:"Active"
        })
    res.json(response);
}
const deleteJob = async (req,res)=>{
    const response = await addJobSchema.deleteOne({_id:req.params.id})
    res.json(response);
}
module.exports={
    allJob,
    addJob,
    findByCategory,
    login,
    signUp,
    status,
    updateStatus,
    deleteJob
}