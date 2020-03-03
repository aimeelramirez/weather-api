//Retrieve the template data from the HTML .
var template = $('#handlebars-demo').html();

var context = { "name" : "Aimee", "occupation" : "developer" };

//Compile the template data into a function
var templateScript = Handlebars.compile(template);

var html = templateScript(context);

$(document.body).append(html);