var express = require("express");
var app = express();
var path=require("path");

module.exports = function(app){
    //displays home page
    app.get("/friend-finder/api/friends", function(req, res){
        var users = require(path.join(__dirname, "../data/friends.js"));
        console.log(users);
        res.json(users);
    });
    app.post("/friend-finder/api/friends", function(req, res){
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        var users = require(path.join(__dirname, "../data/friends.js"));
        var newUser = req.body;
        users.push(newUser);
        res.json(users);
    })
}



