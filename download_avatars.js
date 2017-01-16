var request = require('request');
var fs = require("fs");

var GITHUB_USER = "stevenbamford";
var GITHUB_TOKEN = "dbd8fb3e963b83659c857a40cd77fcd00fd7ccb1";

var userInput = process.argv.slice(2);

function getRepoContributors(repoOwner, repoName, cb) {

  repoOwner = userInput[0];
  repoName = userInput[1];

  var requestURL = "https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName +"/contributors";
  var requestOptions = {
    url: requestURL,
    headers: {
    "user-agent": "GitHub Avatar Downloader - Student Project"
    },
    method: "GET"
}
  request.get(requestOptions, cb);
}

getRepoContributors(userInput[0], userInput[1], function(err, result){
   result = JSON.parse(result.body);
   // console.log(result);

   result = result.forEach(function(user){
    console.log(user.avatar_url);
    downloadImageByURL(user.avatar_url, user.login+".jpg");
   })

   });


function downloadImageByURL(url, filePath) {

if(fs.existsSync("./avatars") !== true){
  fs.mkdirSync("./avatars");
}
  request.get(url)
       .on("error", function(err){
          console.log("errors: ", err);
       })
       .pipe(fs.createWriteStream("./avatars/" + filePath));
}

