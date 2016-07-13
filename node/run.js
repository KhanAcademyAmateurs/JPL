var JPL = require("./jpl.js");
var readline = require("readline");

var interface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false,
	prompt: "> "
});

interface.on("line", function (line) {
	return JPL.exec(JPL, line);
});
