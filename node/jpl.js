module.exports = {
	pluralize: a => a - 1 ? "s" : "",
	err: a => "JPL: Error: " + a,
	
	previous: undefined,
	vars: {},
	cmd: {
		"p": [[JSON.stringify], (j, a) => a[0]],
		"+": [[Number, Number], (j, a) => a[0] + a[1]],
		"-": [[Number, Number], (j, a) => a[0] - a[1]],
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
			return [j.err("Incorrect number of arguments: '" + c + "' takes " + n + " argument" + j.pluralize(n)), true];
		}
		
		for (var i = 0; i < n; i ++) {
			var k = s[i];
			var o = k.split(",");
			
			if (!/^[a-z]+/g.test(k) || k[0] === "\\") {
				a.push(k);
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
