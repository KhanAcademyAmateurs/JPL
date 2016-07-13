var JPL = require("./jpl.js");
var readline = require("readline");

var i = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

while (true) {
	i.question("> ", function (line) {
		process.stdout.write(JPL.exec(JPL, line));
	});
}
