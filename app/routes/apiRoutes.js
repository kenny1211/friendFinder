// import list data
const friendData = require("../data/friendData");
console.log(friendData);
// create and export API routes
module.exports = function(app) {

  // create GET route to send back friendData as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // create POST route to receive data from our front end and add it to our tableData
  app.post("/api/friends", function(req, res) {

    // grab sent information (gets stored in req.body);
    const newFriend = req.body;
    const friendScore = newFriend.scores;
    console.log(newFriend);
    console.log(friendScore);

    const scores = [];
    let match = 0;
    
    //go through all friends in database and iterate through to compare scores, push results into array
    friendData.forEach(function(friend) {
      let scoreDif = 0;

      for (let i = 0; i < friendScore.length; i++){
        scoreDif += (Math.abs(parseInt(friend.scores[i] - parseInt(friendScore[i]))));
      }

      scores.push(scoreDif);
    });
    
    //when the above function is complete, we can now compare for the best match
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] <= scores[match]) {
        match = i;
      }
    }

    // send back match info for user
    let friendMatch = friendData[match];
    res.json(friendMatch);

    // add to our list of friend data
    friendData.push(newFriend);
    
  });

}