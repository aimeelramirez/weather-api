const express =  require('express');
//const exphbs = require('express-handlebars');
const app  = express();

const port = 3000;

// Register Handlebars view engine
//app.engine('handlebars', exphbs());
// Use Handlebars view engine
//app.set('view engine', 'handlebars');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});


app.listen(port, () => console.log(`Example app port listening ${port}`));