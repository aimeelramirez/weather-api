console.log('this is a js file')
window.onload = () => {
    // document.querySelector("#search").innerHTML = '<div class="outer">' +
    // '<input type="text" id="input"/>'
    // +'</div>';
const getCol = () => {
  // let check = document.querySelector("#input");
  // console.log(check);

  let list = document.getElementsByTagName("td");
  for(let i = 0; i < list.length; i++){
    console.log(list[i].textContent);
    
  }
  const search = document.querySelector('input');
  const weatherForm = document.querySelector("form");
  const messageOne = document.querySelector('#message-1');
  const messageTwo = document.querySelector('#message-2');

  //e or event
  weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    //console.log('testing');
    //alert('test')
    const location = search.value;
    //console.log(location);
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '...';
    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
      response.json().then((data)=>{
       //console.log(data)
       if(data.error){
         console.log(data.error)
         }else{
           console.log(data.location)
           console.log(data.forecast)
           //document.querySelector('p')
           messageOne.textContent = data.location;
           messageTwo.textContent = data.forecast;
         // messageOne.innerHTML = '<div class=outer>' + messageOne.textContent +'</div>';

       }
      })
    })
  })

 }
 getCol();
}
// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//   response.json().then((data)=>{
//     console.log(data.puzzle)
//     })
//   }) 



//const data = '<p>test</p>'
///const getClick = document.getElementById("col").append(test).innerHTML;

  