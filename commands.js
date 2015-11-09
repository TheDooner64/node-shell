var fs = require("fs");
var path = require("path");

function evaluateCmd(userInput) {
    var userInputArray = userInput.split(" ");
    var command = userInputArray[0];
    
    switch(command) {
      case "pwd":
        commandLibrary.pwd();
        break;
      case "date":
        commandLibrary.date();
        break;
      case "ls":
        commandLibrary.ls();
        break;
      case "cat":
        commandLibrary.cat(userInputArray.slice(1));
        break;
      case "head":
        
        break;
    }
}

var commandLibrary = {
    "pwd": function () {
      process.stdout.write(path.dirname(process.argv[1]));
      process.stdout.write('\nprompt > ');
    },
    "date": function() {
      currentDate = new Date().toDateString();
      process.stdout.write(currentDate);
      process.stdout.write('\nprompt > ');
    },
    "ls": function() {
      fs.readdir(".", function (err, files) {
        if (err) throw err;
        files.forEach(function(file) {
          process.stdout.write(file.toString());
        });
        process.stdout.write('\nprompt > ');
      });
    },
    "cat": function(fullPath) {
      var fileName = fullPath[0];
      fs.readFile(fileName, function (err, data) {
        if (err) throw err;
        process.stdout.write(data);
        process.stdout.write('\nprompt > ');
      });
    },
    "head": function() {
      
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;