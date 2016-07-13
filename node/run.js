var JPL = require("./jpl.js");
var readline = require("readline");

var i = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

function prompt () {
	i.question("> ", function (line) {
		var result = JPL.exec(JPL, line); 
		
		process.stdout.write(result[0] + (result[1] ? "\n" : ""));
		prompt();
	});
}

prompt();
