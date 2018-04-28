// Dependencies
var express = require("express");
var bodyParser= require("body-parser")
var path = require("path");
//Setting up the Express App
var app = express();
// Setting up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use("../assets", express.static(path.join(__dirname, "images")));
// app.use("../assets", express.static(path.join(__dirname, "css")));
var PORT = process.env.PORT||8080;
//requiring module
// var htmlRoutes = require(path.join(__dirname, "/app/routing/htmlRoutes.js"));
// htmlRoutes.routes();
// var apiRoutes = require(path.join(__dirname, "/app/routing/apiRoutes.js"));
// apiRoutes.routes();
require(path.join(__dirname, "/app/routing/htmlRoutes.js"))(app);
require(path.join(__dirname, "/app/routing/apiRoutes.js"))(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});