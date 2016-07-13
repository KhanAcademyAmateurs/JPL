var JPL = require("./jpl.js");
var readline = require("readline");

var interface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true
});

interface.on("line", function (line) {
	console.log(JPL.exec(JPL, line));
});
