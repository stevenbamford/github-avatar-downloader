require('dotenv').config();

var request = require('request');
var fs = require("fs");
var dotenv = require('dotenv').config();

function response (err, result){
  if(err){
    console.log("Error: ", err);
  }
   result = JSON.parse(result.body);
   console.log("Downloading avatars now...");
   result = result.forEach(function(user){
    downloadImageByURL(user.avatar_url, user.login + ".jpg");
   })
   console.log("Download complete! Check the avatars directory to see all contributors.");
}

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

var GITHUB_USER = process.env.GITHUB_USER
var GITHUB_TOKEN = process.env.GITHUB_TOKEN
var userInput = process.argv.slice(2);

function getRepoContributors(repoOwner, repoName, cb) {
  if(userInput.length < 2){
    console.log("Please try again. Enter a GitHub repository owner and name");
    return;
  }

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


getRepoContributors(userInput[0], userInput[1], response);



