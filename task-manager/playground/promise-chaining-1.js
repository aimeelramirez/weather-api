require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e615797b8a50b370c285bdb').then((task) =>{
    console.log(task);
    return Task.countDocuments({completed: false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed : false });
    return count

}
deleteTaskAndCount('5e615230cbdf1634acd7922c').then((count)=>{
 console.log(count)
}).catch((e)=>{
    console.log(e);
});



