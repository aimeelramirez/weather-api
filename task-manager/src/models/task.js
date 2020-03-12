const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

// const example = new Task({
//     description:"    EaT LuNCh"
// })

// example.save().then(()=>{
//         console.log(example)
//     }).catch((error)=>{
//         console.log(error)
//     })
 

module.exports = Task
// const example = new Task({
//     description:"    EaT LuNCh"
// })

// example.save().then(()=>{
//         console.log(example)
//     }).catch((error)=>{
//         console.log(error)
//     })
 
