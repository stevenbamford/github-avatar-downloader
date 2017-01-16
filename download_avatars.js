var request = require('request');

var GITHUB_USER = "stevenbamford";
var GITHUB_TOKEN = "dbd8fb3e963b83659c857a40cd77fcd00fd7ccb1";

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = "https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName +"/contributors";
  console.log(requestURL);
  // request.get(url);
}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors:", err);
  console.log("Results:", result);
});