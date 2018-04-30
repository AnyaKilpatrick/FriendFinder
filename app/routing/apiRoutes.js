var express = require("express");
var app = express();
var path=require("path");

module.exports = function(app){
    //displays home page
    app.get("/api/friends", function(req, res){
        var users = require(path.join(__dirname, "../data/friends.js"));
        // console.log(users);
        res.json(users);
    });
    app.post("/api/friends", function(req, res){
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        var users = require(path.join(__dirname, "../data/friends.js"));
        var newUser = req.body;
        
        //checking compatibility
        var differences = []; //array of totalDifferences
        var totalDifference=0;
        var score=0;
        for (var m=0;m<users.length;m++){//looping through users array
            for (var i = 0; i<newUser.scores.length; i++){//looping through each user's scores array 
                var difference = Math.abs(users[m].scores[i] - newUser.scores[i]);
                totalDifference += difference; //adding results after each match
                score++;
                if(score === 10){ //when score=10, it means that we looped through all scores of one user, and next 10 numbers will be from another user
                    var match = {
                        userIndex: m, //userIndex proroperty hold the user index, so after sorting numbers we will know which user this object relates to
                        scoreDifference: totalDifference
                    }
                    differences.push(match);//pushing sum to array
                    totalDifference=0;//setting back to 0
                    score=0;
                }
            }
        }
        console.log("Array: "+ JSON.stringify(differences));
        differences.sort(function(a, b) { //sorting objects in an array in ascending order of scoreDifference
            return parseFloat(a.scoreDifference) - parseFloat(b.scoreDifference);
        });
        console.log("Best match "+ JSON.stringify(differences[0]));//first object is the best match as it has the lowest totalDifference
        var bestMatchUserId = differences[0].userIndex;
        // module.exports = users[bestMatchUserId];
        //we are pushing newUser to array of users after we checked compatibility
        users.push(newUser);
        res.json(users);
    })
}



