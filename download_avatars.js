var request = require('request');
var fs = require("fs");

var GITHUB_USER = "stevenbamford";
var GITHUB_TOKEN = "dbd8fb3e963b83659c857a40cd77fcd00fd7ccb1";

function getRepoContributors(repoOwner, repoName, cb) {

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

getRepoContributors("jquery", "jquery", function(err, result){
   result = JSON.parse(result.body);
   // console.log(result);

   result = result.forEach(function(user){
    console.log(user.avatar_url);
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

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani.jpg");