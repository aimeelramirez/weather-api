const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express(); 
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//app.com // figurative domain 
//routes
//app.com/help
//app.com/about 
//req = request
//res = response
console.log(__dirname);
//gets the public directory and goes up one folder
///THE STUPID ../views vs the views
console.log(path.join(__dirname, '../views'));

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// app.set('view engine', 'hbs')
// app.set('views', viewsPath)

app.use(express.static(publicDirPath));

//gets the images from public to call
app.use(express.static('public/img'));
//gets the styles to be dynamic
app.use(express.static('public/css'));
//gets  the js to be dynamic
app.use(express.static('public/js'));

//getting json 
// app.get('/products', (res, req) =>{
//     res.send({
//         products:[]
//     })
// })
 app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error:"you must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
         if(error) {
             //  return res.send({error: error});
             return res.send({error});  
         }
         forecast(latitude, longitude, (error, forecastData) =>{
             if(error ){
                 return res.send({error});
             } 
             res.send({
                 forecast: forecastData,
                 location,
                 address:req.query.address
                 //weather?address=north/\providence
             })
            // console.log(latitude, longitude)
         })
    })
  
 })

// app.route("/weather").get( function(res, req){
  
// })
app.route("/products").get(function (req, res) {
   // console.log(req.query.search);
   if(!req.query.search) {
       return res.send({
                //products:[]
                error: "you must provide a search term"
            })
        }
        else{
        console.log(req.query)
            return res.send({
                products:[]
               
            })
        }
        ///products?search=games&ratings=5
})
    
    
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aimee Ramirez',
        occupation: 'Software Engineer (intern)'
    })
})

app.get('/help',(req, res) =>{
    res.render('help', {
        title:"Help",
        name:"Aimee Ramirez",
        occupation: "Tester"
    })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aimee Ramirez',
        occupation: 'abouter'
    })
})


//has to go last 
//hackedd look it up the right way to do
// app.route("*").get(function (req, res) {
//         res.send('Sorry this is not a page to read.'+'<h1>404</h1>')
//       })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aimee Ramirez',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aimee Ramirez',
        errorMessage: 'Page not found.'
    })
})
app.listen(3000, () =>{
    console.log('server is listening at post 3000.')
})
