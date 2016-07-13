module.exports = {
	plize: a => a - 1 ? "s" : "",
	vars: {},
	cmd: {
		"p": [[JSON.stringify], (j, a) => a[0]],
		"+": [[Number, Number], (j, a) => a[0] + a[1]],
		"-": [[Number, Number], (j, a) => a[0] - a[1]],
		"c": [[String, String], (j, a) => a[0] + a[1]],
		"g": [[String], function (j, a) {
			var v = j.vars[a[0]];
			
			if (v === undefined) {
				return "JPL: Error: Variable '" + v + "' not found";
			}
			
			return v;
		}],
		"s": [[String, a => a], function (j, a) {
			if (/^[a-z]+$/g.test(a[0])) {
				return "JPL: Error: Variable name '" + a[0] + "' is all lowercase";
			}
			
			return (j.vars[a[0]] = a[1]), "";
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
			return ["JPL: Error: Function not found: '" + c + "'", true];
		}
		
		var t = m[0].length;
		var n = s.length;
		
		if (n !== t) {
			return ["JPL: Error: Incorrect number of arguments: '" + c + "' takes " + n + " argument" + j.plize(n), true];
		}
		
		for (var i = 0; i < n; i ++) {
			var k = s[i];
			var o = k.split(",");
			
			if (o.length < 2) {
				a.push(k);
			} else {
				a.push(j.exec(j, o.join(" "))[0]);
			}
		}
		
		var r = m[1](j, a.map(function (e, i) {
			return m[0][i](e);
		}));
		
		return [typeof r === "string" ? r : (r = JSON.stringify(r)), c !== "p" && r.length];
	}
};
