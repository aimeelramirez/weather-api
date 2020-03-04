const doWorkPromise = new Promise((resolve, reject)=>{
 setTimeout(()=>{
   reject('This is an error...')
   //resolve([2,3,5])
  // reject('Two...')
 }, 2000)   
})
doWorkPromise.then((result) =>{
    console.log('Success!', result)
}).catch((error)=>{
    console.log('Error!', error)
})

const pending = new Promise((fulfilled, reject) =>{
    setTimeout(()=>{
        fulfilled('This is sent')
    }, 2000)
})
pending.then((result) =>{
    console.log('Success!', result)
}).catch((error)=>{
    console.log('Error!', error)
})