var express = require("express");
var app = express();
var path=require("path");

module.exports = function(app){
    //displays home page
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
    //displays survey page
    app.get("/survey", function(req, res){
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });
    // redirects to home page if not matching route is found
    app.get('*',function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
}


