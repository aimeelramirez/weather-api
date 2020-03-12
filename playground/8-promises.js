// const doWorkPromise = new Promise((resolve, reject)=>{
//  setTimeout(()=>{
//    reject('This is an error...')
//    //resolve([2,3,5])
//   // reject('Two...')
//  }, 2000)   
// })
// doWorkPromise.then((result) =>{
//     console.log('Success!', result)
// }).catch((error)=>{
//     console.log('Error!', error)
// })

// const pending = new Promise((fulfilled, reject) =>{
//     setTimeout(()=>{
//         fulfilled('This is sent')
//     }, 2000)
// })
// pending.then((result) =>{
//     console.log('Success!', result)
// }).catch((error)=>{
//     console.log('Error!', error)
// })
const add = (a,b) =>{
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            resolve(a + b)
        }, 2000)
    })
}
// add(1,3).then((sum)=>{

//     console.log(sum)
//     add(sum, 5).then((sum2)=>{
//         console.log(sum2)

//     }).catch((e)=>{
//         console.log(e)
//     })
// }).catch((e)=>{
//     console.log(e)
// })
//Promise chaining
add(1,1).then((sum)=>{
    console.log(sum);
    return add(sum, 4);
}).then((sum2)=>{
    console.log(sum2)
}).catch((e)=>{
    console.log(e)
})