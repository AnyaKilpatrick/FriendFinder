var express = require("express");
var app = express();
var path=require("path");

module.exports = function(app){
    //displays home page
    app.get("/friend-finder/", function(req, res){
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
    //displays survey page
    app.get("/friend-finder/survey", function(req, res){
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });
    //redirects to home page
    // app.get('*',function (req, res) { //redirecting any route not handled to the index "/"
    //     res.redirect('/friend-finder/');
    // });
}
