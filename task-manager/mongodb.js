// const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient;

// const ObjectID = mongodb.ObjectID;


const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
//console.log(id.id.length);
//console.log(id.toHexString().length);
//console.log(id.getTimestamp());
//{useNewUrlParser: true}
MongoClient.connect(connectionURL,{ useUnifiedTopology: true } , (error, client) =>{
    if(error){
        return console.log('unable to connect to database');
    }
   const db = client.db(databaseName);
     db.collection('users').updateOne({
        _id: new ObjectID("5e5ff339972d6d432cdbe504")
    }, {
        $set:{
            name:"Aaron",
            age:30
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })


    
});
  // db.collection('users').findOne({_id: new ObjectID("5e5ff339972d6d432cdbe504")}, (error, user) =>{
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({age: 29}).toArray((error, users) =>{
    //     console.log(users)
    // })
    // db.collection('users').find({age: 29}).count((error, count) =>{
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({_id: new ObjectID("5e5ffaa92c9fc9090c6a33be")}, (error, task)=>{
    //     if(error){
    //         return console.log('unable to find')
    //     }
    //     console.log(task)
    //     db.collection('tasks').find({completed:false}).toArray((error, task)=>{
    //         console.log(task)
    //     })
    // })
   //console.log('connected correctly');
//    const db = client.db(databaseName);

//    db.collection('users').insertOne({
//     //    _id: id,
//        name: 'Aimee Lynn',
//        age:29
//    }, (error, result) => {
//        if(error){
//            return console.log('Unable to insert user')
//        }
//        console.log(result.ops);
//    })
    // db.collection('users').insertMany([
    //     {
    //         name: 'aimee',
    //         age:29
    //     },
    //     {   name: 'alesana',
    //         age:6
    //     }
    // ],(error, result) =>{
    //         if(error){
    //             return console.log('Unable to connect and insert docs');
    //         }
    //         console.log(result.ops)
    //     })
    // db.collection('tasks').insertMany([
    //     {
    //         description:"Clean the house",
    //         completed:true
    //     },{
    //         description:"Renew inspection",
    //         completed:false
    //     },{
    //         description:"Water plants",
    //         completed:true
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert document');
    //     }
    //     console.log(result.ops)

    // })




