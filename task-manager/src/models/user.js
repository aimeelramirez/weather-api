const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema =  new mongoose.Schema({ 
    name: {
    type:String,
    required:true,
    trim:true   
},
email:{
    type: String,
    unique:true,
    required:true,
    trim:true,
    lowercase: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is not valid')
        }
    }  
},  
password:{
    type:String,
    required:true,
    minlength:7,
    trim:true,
    validate(value){
        if(value.toLowerCase().includes("password")){
            throw new Error('This can not be password')
        }
    }

},       
age:{
    type:Number,
    default:0,
    validate(value){
        if(value < 0){
            throw new Error('age must be a postive number')
        }
    }

}
})
userSchema.statics.findByCredentials = async(email, password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}
//Hash the plain text password before saving
userSchema.pre("save", async function(next){
   // console.log(userSchema.user.password)
    const user = this;
    console.log(this.password)
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log(this.password)
    // console.log('just before saving')
    // next()


});

const User = mongoose.model('User', userSchema)

module.exports = User
// const example = new User({
//     name:"      Aimee     ",
//     age: 29,
//     email:'AIMEE@GMAIL.COM',
//     password:"phone123!"
// })

// example.save().then(()=>{
//     console.log(example)
// }).catch((error)=>{
//     console.log(error)
// })