const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
//const router = express();

const router = new express.Router();

// const sendRouter = router.get('/test',( req, res) =>{
//     res.send('this is from my other router')
// } )

router.post('/users',  async (req, res)=>{
    const user = new User(req.body)
    //catching user
    //console.log(user)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
   
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
    // console.log(req.body)
    // res.send('testing');
})


router.post('/users/login', async (req, res)=>{
    try{
     
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send({user, token})

        console.log('**Logged in**')
    } catch(e){
        console.log(e)
        res.status(400).send()
    }
    
})
router.get('/users', auth, async(req, res)=>{
    //res.send('this is a users endpoint');
    try{
        const users = await User.find({})
        // res.status(400).send(user)
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
    // User.find({}).then((users)=>{
    //     res.send(users);
    // }).catch(()=>{
    //     res.status(500).send();
    // })
})

router.get('/users/:id', async (req, res) =>{
    //console.log(req.params)
    const _id = req.params.id;
    try{
        const user = await User.findById({_id})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
    // User.find({}).then((users)=>{
    //     res.send(users);
    // }).catch(()=>{
    //     res.status(500).send();
    // })
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send();
    //     }
    //     res.send(user);

    // }).catch(() =>{
    //     res.status(500).send();
        
    // })
})
//patch

router.patch('/users/:id', async(req, res)=>{
    //ummm this is not good...
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:"invalid update"})
    }

    try{
        const user = await User.findById(req.params.id)

        updates.forEach((update)=>{
            user[update] = req.body[update]
      
        })
        await user.save()
    //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
    if(!user){
        return res.status(404).send()
    }
    res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})
//delete
router.delete('/users/:id', async( req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()

        }
        res.send(user)

    }catch(e){
        res.status(500).send()
    }
})

//app.use(router);
//module.exports = router;
module.exports = router;

// app.post('/users',  async (req, res)=>{
//     const user = new User(req.body)
//     try{
//         await user.save()
//         res.status(201).send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }
   
//     // user.save().then(()=>{
//     //     res.status(201).send(user)
//     // }).catch((e)=>{
//     //     res.status(400).send(e)
//     // })
//     // console.log(req.body)
//     // res.send('testing');
// })
// app.get('/users', async(req, res)=>{
//     //res.send('this is a users endpoint');
//     try{
//         const users = await User.find({})
//         // res.status(400).send(user)
//         res.send(users)
//     }catch(e){
//         res.status(500).send(e)
//     }
//     // User.find({}).then((users)=>{
//     //     res.send(users);
//     // }).catch(()=>{
//     //     res.status(500).send();
//     // })
// })

// app.get('/users/:id', async (req, res) =>{
//     //console.log(req.params)
//     const _id = req.params.id;
//     try{
//         const user = await User.findById({_id})
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
//     // User.find({}).then((users)=>{
//     //     res.send(users);
//     // }).catch(()=>{
//     //     res.status(500).send();
//     // })
//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send();
//     //     }
//     //     res.send(user);

//     // }).catch(() =>{
//     //     res.status(500).send();
        
//     // })
// })
// //patch

// app.patch('/users/:id', async(req, res)=>{
//     //ummm this is not good...
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['name', 'email', 'password', 'age'];
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if(!isValidOperation){
//         return res.status(400).send({error:"invalid update"})
//     }

//     try{
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
//     if(!user){
//         return res.status(404).send()
//     }
//     res.send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })
// //delete
// app.delete('/users/:id', async( req, res)=>{
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(404).send()

//         }
//         res.send(user)

//     }catch(e){
//         res.status(500).send()
//     }
// })