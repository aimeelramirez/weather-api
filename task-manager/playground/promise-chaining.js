require('../src/db/mongoose')
const User = require('../src/models/user')



//5e612fb2cc79a60e349ba730
User.findByIdAndUpdate('5e612ff42174e23bb4bae711', {age: 1}).then((user)=>{
    console.log(user);
    return User.countDocuments({age: 1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e);
})

const updateAgeCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age });
    const count = await User.countDocuments({ age });
    

}
updateAgeCount('5e612ff42174e23bb4bae711', 2).then((count) =>{
    console.log(count);

}).catch((e)=>{
    console.log(e);
});

