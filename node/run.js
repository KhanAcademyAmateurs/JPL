var JPL = require("./jpl.js");
var readline = require("readline");

var interface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

interface.on("line", function (line) {
	console.log(JPL.exec(line));
});
