# Friend Finder

Deployed application [here](https://myfriend-finder.herokuapp.com/)

### Overview

Compatibility-based "FriendFinder" application. 
This full-stack site takes in results from users' surveys, then compares their answers with those from other users. The app will then display the name and picture of the user with the best overall match. 

Express was used to handle routing. Application is deployed to Heroku so other users can fill it out.



1. Survey has 10 questions. Each answer is on a scale of 1 to 5 based on how much the user agrees or disagrees with a question.

2. `server.js` file requires the basic npm packages: `express`, `body-parser` and `path`.

3. `htmlRoutes.js` file includes two routes:
   * A GET Route to `home.html` which displays the home page.
   * A GET Route to `/survey` which displays the survey page.
   * A default, catch-all route that redirects to `home.html` (home page). 

4. `apiRoutes.js` file contains two routes:

   * A GET route with the url `/api/friends`. This is used to display a JSON of all possible friends.
   * A POST routes `/api/friends`. This is used to handle incoming survey results. This route is also used to handle the compatibility logic. 

5. All applications' data is saved inside of `app/data/friends.js` as an array of objects. Each of these objects has the following format

```json
{
"name":"Kate",
"photo":"http://cdn.cavemancircus.com//wp-content/uploads/images/2015/june/pretty_girls_3/pretty_girls_1.jpg",
"scores":[
    5,
    4,
    4,
    4,
    1,
    5,
    4,
    5,
    4,
    2
    ]
}
```

6. Determining the user's most compatible friend:

App is comparing the difference between current user's scores against those from other users, question by question. Then it adds up the differences to calculate the `totalDifference`.
* Example: 
    * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
    * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
    * Total Difference: **2 + 1 + 2 =** **_5_**

App uses the absolute value of the differences. 
```javascript
var difference = Math.abs(users[m].scores[i] - newUser.scores[i]);
```
App calculates both `5-3` and `3-5` as `2`, and so on.
The closest match will be the user with the least amount of difference.

```javascript
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
                userIndex: m, //userIndex proroperty holds the user index, so after sorting numbers we will know which user this object relates to
                scoreDifference: totalDifference
            }
            differences.push(match);//pushing sum to array
            totalDifference=0;//setting back to 0
            score=0;
        }
    }
}

differences.sort(function(a, b) { //sorting objects in an array in ascending order of scoreDifference
    return parseFloat(a.scoreDifference) - parseFloat(b.scoreDifference);
});

var bestMatchUserId = differences[0].userIndex;//first object (index 0) is the best match as it has the lowest totalDifference
var bestMatch = users[bestMatchUserId];
//we are pushing newUser to array of users after we checked compatibility
users.push(newUser);
res.json(bestMatch);
```
7. Once app has found the current user's most compatible friend, it displays the result as a modal pop-up.
The modal displays both the name and picture of the closest match.