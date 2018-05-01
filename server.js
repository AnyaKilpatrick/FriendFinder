// Dependencies
var express = require("express");
var bodyParser= require("body-parser")
var path = require("path");
//Setting up the Express App
var app = express();
// Setting up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var PORT = process.env.PORT||8080;
//requiring module
require(path.join(__dirname, "/app/routing/apiRoutes.js"))(app); //requiring apiRoutes first, because htmlRoutes have a default route to home page
require(path.join(__dirname, "/app/routing/htmlRoutes.js"))(app); 


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});