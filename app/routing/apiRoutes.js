var friendData = require("../data/friends");
parseInt(friendData.scores);

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });
    
     
    
    app.post("/api/friends", function(req, res){
     var userTest = req.body;
    
     var userScore = userTest.scores;
     var matchName = "";
     var matchPic =""; 

    
     var totalDiff = 7000;
     for(var i = 0; i < friendData.length; i++) {
       // console.log('friend = ' + JSON.stringify(friendData[i]));
         var sums = 0;
         for(var j = 0; j < userScore.length; j++) {
             sums += Math.abs(friendData[i].scores[j] - userScore[j]);
         }
         console.log(sums);
         if(sums < totalDiff) {
            console.log('Closest match found = ' + sums);
            console.log('Friend name = ' + friendData[i].name);
             totalDiff = sums;
             matchName = friendData[i].name;
             matchPic = friendData[i].photo;

         }
     }
     friendData.push(userTest);
       
        
        res.json({status: "OK", matchName: matchName, matchPic:matchPic});
    });
};
