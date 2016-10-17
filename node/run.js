var JPL = require("./jpl.js");
var readline = require("readline");

var ps4 = "> ";

var i = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true
});

function prompt () {
	i.question(ps4, function (line) {
		var result = JPL.exec(JPL, line);
		
		if (JPL.function.in) {
			ps4 = ". ";
		} else {
			ps4 = "> ";
			process.stdout.write(result[0] + (result[1] ? "\n" : ""));
		}
		
		prompt();
	});
}

prompt();
