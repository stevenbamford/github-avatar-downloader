var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {

  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName +"/contributors";
  request.get(url);
}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors:", err);
  console.log("Results:", result);
});