module.exports = {
	pl: a => a - 1 ? "s" : "",
	err: a => "\033[31mJPL: Error: " + a + "\033[0m",
	
	previous: undefined,
	vars: {},
	cmd: {
		"p": [[a => a instanceof String ? a : JSON.stringify(a)], (j, a) => a[0]],
		"+": [[Number, Number], (j, a) => a[0] + a[1]],
		"-": [[Number, Number], (j, a) => a[0] - a[1]],
		"*": [[Number, Number], (j, a) => a[0] * a[1]],
		"/": [[Number, Number], (j, a) => a[0] / a[1]],
		"c": [[String, String], (j, a) => a[0] + a[1]],
		"g": [[String], function (j, a) {
			var v = j.vars[a[0]];
			
			if (v === undefined) {
				return j.err("Variable '" + a[0] + "' not found");
			}
			
			return v;
		}],
		"s": [[String, a => a], function (j, a) {
			if (/^[a-z]+$/g.test(a[0])) {
				return j.err("Variable name '" + a[0] + "' is all lowercase");
			}
			
			return (j.vars[a[0]] = a[1]), "";
		}],
		"t": [[], function (j) {
			var p = j.previous;
			
			if (p === undefined) {
				return j.err("Nothing to take using 't'");
			}
			
			return p;
		}],
		"i": [[Boolean, String], function (j, a) {
			if (a[0]) {
				return j.exec(j, a[1].replace(/,/g, " "))[0];
			} else {
				return "";
			}
		}]
	},
	exec: function (j, s) {
		s = s.replace(/^ +/, "").split(" ");
		var c = s.shift();
		var a = [];
		
		if (c === "$" || !c.length) {
			return ["", false];
		}
		
		var m = j.cmd[c];
		
		if (!m) {
			return [j.err("Function not found: '" + c + "'"), true];
		}
		
		var t = m[0].length;
		var n = s.length;
		
		if (n !== t) {
			return [j.err("Incorrect number of arguments: '" + c + "' takes " + t + " argument" + j.pl(t)), true];
		}
		
		for (var i = 0; i < n; i ++) {
			var k = s[i];
			var o = k.split(",");
			
			if (o.length < 2 && !/^[a-z]+$/g.test(k) && k[0] !== "\\") {
				a.push(k);
			} else if (k[0] === "\\") {
				a.push(k.slice(1, k.length));
			} else {
				a.push(j.exec(j, o.join(" "))[0]);
			}
		}
		
		var r = m[1](j, a.map(function (e, i) {
			return m[0][i](e);
		}));
		
		j.previous = r;
		
		return [typeof r === "string" ? r : (r = JSON.stringify(r)), c !== "p" && r.length];
	}
};
