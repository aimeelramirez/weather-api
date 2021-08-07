const https = require('https');
const opts = require('./config')
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const controller = require('./utils/controller');
const apiCall = require('./utils/controller')
const session = require('express-session')
let sess;
// app.use(session({ secret: "secret", saveUninitialized: true, resave: false }))
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
}))
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
const imgsPath = path.join(__dirname, '../public/img');

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//set port
const port = 8080
app.set("port", port);

app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs')

app.set('hbs', hbs.__express)

// app.set('views', viewsPath)

app.use(express.static(publicDirPath));

//gets the images from public to call
app.use(express.static(imgsPath));
//gets the styles to be dynamic
app.use(express.static('public/css'));
//gets  the js to be dynamic
app.use(express.static('public/js'));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

let body = []



app.get('/index', (req, res) => {
    sess = req.session
    if (sess.itemsInCart == true) {
        res.render('index', {
            title: 'DASHBOARD',
            message: 'Ready to checkout?\n Navigate to Cart.',
            sess: sess,
            category: body
        })
    } else {
        res.render('index', {
            title: 'DASHBOARD',
            message: 'Welcome to Cart!',
            sess: sess
        })
    }
    // next()
})

app.get('/', (req, res) => {
    sess = req.session
    if (sess.itemsInCart == true) {
        res.render('index', {
            title: 'DASHBOARD',
            message: 'Ready to checkout?\n Navigate to Cart.',
            sess: sess,
            category: body
        })
    } else {
        res.render('index', {
            title: 'DASHBOARD',
            message: 'Welcome to Cart!',
            sess: sess
        })
    }
    // next()
})

const routes = (app) => {
    app.route("/").get((req, res, next) => {
        // middleware
        res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
        res.header(
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, X-Requested-With, Content-Type, Accept",
        )
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request body: ${req.body}`)
        console.log('Sub Pages - Dashboard - Cart');

        //check cart
        next()
    })
    app.get("/api/test/all", controller.allAccess)


    app.route('/cart').get((req, res, next) => {
        console.log('Sub Pages -  Cart');
        sess = req.session
        if (sess.itemsInCart == true) {
            res.render('cart', {
                title: 'CART',
                message: 'Welcome to your cart!',
                sess: sess,
                category: body
            })
        } else {
            res.render('cart', {
                title: 'CART',
                message: 'Add items into basket.',
                sess: sess
            })
        }
        // next()
    })
    app.get("/cart/update", controller.cartStorage)

    app.route('/cart/update').post((req, res, next) => {
        console.log('Sub Pages - Cart Update');
        //set sess
        sess = req.session
        sess.itemsInCart = true
        sess.body = req.body
        if (sess.body !== "") {
            body.push(req.body)
            sess.category = body
        }
        next()
    })
    app.route('/cart/update').delete((req, res, next) => {
        console.log('Sub Pages - Cart Delete');
        //set sess
        console.log("deleted", req.body)
        sess = req.session
        sess.itemsInCart = false
        sess.body = req.body
        if (sess.body !== "") {
            body = []
            sess.category = body
        }
        next()
    })
}

routes(app)
// app.use("/cart", (req, res, next) => {
//     //get auth
//     console.log(req)
//     console.log('Sub Pages - Dashboard - Cart');
//     //get logic for email and password
//     let checkErrors = 0;
//     // let checkErrors = controller.cart(req, res)
//     //set sess
//     sess = req.session
//     sess.loggedIn = true
//     sess.category = req.body
//     //check auth
//     // let checkAuth = verifyAuth(req, res)
//     // console.log(checkAuth)
//     if (checkErrors <= 0) {
//         //pass the session 

//         return next();
//         //check sessions
//         // sess.cookie.maxAge / 1000
//         // let items = [];
//         // items.push({ email: req.body.email, password: req.body.password });
//         // let options = {
//         //     uri: 'https://or3y026ir5.execute-api.us-east-1.amazonaws.com/prod',
//         //     method: 'POST',
//         //     body: JSON.stringify({ email: req.body.email, password: req.body.password }),
//         //     headers: { "Content-Type": "application/json" }
//         // }


//         //make api promise
//         // apiCall.getApiCall(options);
//         res.end()

//     } else {
//         console.log('Sub Pages - Dashboard - Error User');
//         res.render('index', {
//             title: 'HOME',
//             message: 'Back to Home page.',
//             session: sess
//         })
//         res.end();


//     }

//     res.end();
// })


app.get('/about', (req, res) => {
    sess = req.session;
    if (sess.itemsInCart == true) {
        res.render('about', {
            title: 'ABOUT',
            message: 'Ready to checkout?',
            sess: JSON.stringify(sess)
        })
    } else {
        res.render('about', {
            title: 'ABOUT',
            message: 'Add items into basket.',
            sess: JSON.stringify(sess)
        })
    }

})



app.get('/help', (req, res) => {
    sess = req.session;
    res.render('help', {
        title: 'HELP',
        message: 'Please contact support for further assistance.',
        sess: JSON.stringify(sess)
    })
})

app.get('*', (req, res) => {
    sess = req.session;
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        sess: JSON.stringify(sess)
    })
})
//ssl
https
    .createServer(opts, app, (req, res) => {
        res.status(200)
        res.send(`server is listening at post ${port}.`)
        res.end()
    }).listen(port);