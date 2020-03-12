const express = require('express')
const app =  express();
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const port = process.env.PORT || 3000;


app.use((req, res, next) =>{
//    console.log(req.method, req.path)
  //  next()
if(req.method == 'GET'){
    res.send('GET requests are disabled')
}else{
    next()
}

})

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)
//without middleware
// new req -> run route handler


//with middleware
// new req => do something => run route handler



//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const myFunction = async() =>{
    const token = jwt.sign({_id: "t203"}, 'thisismynewcourse', {expiresIn:"1 seconds"})
    ///it's still running after two seconds?
    console.log(token)
  const data = jwt.verify(token, 'thisismynewcourse')
  console.log(data)
  
}
myFunction()
// const myFunction = async () =>{
//     const password = "Blue123!"
//     const hashedPassword = await bcrypt.hash(password, 8);
//     console.log(password);
//     console.log(hashedPassword);
//     //const isMatch = await bcrypt.compare(password, hashedPassword);
//     const isMatch = await bcrypt.compare("blue123!", hashedPassword)
//     console.log(isMatch)
// }
// myFunction()

app.listen(port, () =>{
    console.log('Listening to port ' + port)
})