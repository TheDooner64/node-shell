var path = require("path");

var commands = {
    "pwd" : function () {
         console.log(path.dirname(process.argv[1]));
    },
};

function evaluateCmd(input) {
    var args = input.split(" ");
    if (args[0] === "pwd") {
        commands["pwd"]();
    }
}

process.stdout.write('prompt > ');
process.stdin.on('data', function(data) {
  var cmd = data.toString().trim(); // remove the newline
  evaluateCmd(cmd);
  // process.stdout.write('You typed: ' + cmd);
  // process.stdout.write('\nprompt > ');

});