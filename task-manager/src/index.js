const express = require('express')
const app =  express();
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const bcrypt = require('bcryptjs');

const myFunction = async () =>{
    const password = "Blue123!"
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(password);
    console.log(hashedPassword);
    //const isMatch = await bcrypt.compare(password, hashedPassword);
    const isMatch = await bcrypt.compare("blue123!", hashedPassword)
    console.log(isMatch)
}
myFunction()

app.listen(port, () =>{
    console.log('Listening to port ' + port)
})