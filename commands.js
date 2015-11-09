var fs = require("fs");
var path = require("path");
var http = require("http");

function evaluateCmd(userInput) {
    var userInputArray = userInput.split(" ");
    var command = userInputArray[0];

    switch (command) {
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
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            commandLibrary.tail(userInputArray.slice(1));
            break;
        case "curl":
            commandLibrary.curl(userInputArray.slice(1));
            break;
    }
}

var commandLibrary = {
    "pwd": function() {
        process.stdout.write(path.dirname(process.argv[1]));
        process.stdout.write('\nprompt > ');
    },
    "date": function() {
        currentDate = new Date().toDateString();
        process.stdout.write(currentDate);
        process.stdout.write('\nprompt > ');
    },
    "ls": function() {
        fs.readdir(".", function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
                process.stdout.write(file.toString());
            });
            process.stdout.write('\nprompt > ');
        });
    },
    "cat": function(fullPath) {
        var fileName = fullPath[0];
        fs.readFile(fileName, function(err, data) {
            if (err) throw err;
            process.stdout.write(data);
            process.stdout.write('\nprompt > ');
        });
    },
    "echo": function(userInput) {
        var env_variable = /\$\w*/.exec(userInput)[0];
        process.stdout.write(userInput.replace(env_variable, process.env[env_variable.slice(1)]));
        process.stdout.write('\nprompt > ');
    },
    "head": function(fullPath) {
        var fileName = fullPath[0];
        fs.readFile(fileName, function(err, data) {
            if (err) throw err;
            // console.log("filename", data.toString());
            var dataArr = data.toString().split("\n");
            console.log("data array:", dataArr);

            process.stdout.write(dataArr.slice(0,5).join("\n"));
            process.stdout.write('\nprompt > ');
        });
    },
    "tail": function(fullPath) {
        var fileName = fullPath[0];
        fs.readFile(fileName, function(err, data) {
            if (err) throw err;
            var dataArr = data.toString().split("\n");
            var length = dataArr.length;
            process.stdout.write(dataArr.slice(length - 5).join("\n"));
            process.stdout.write('\nprompt > ');
        });
    },
    "curl" : function (url) { //this will be an array..
       //TODO
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
