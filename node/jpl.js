module.exports = {
	pl: a => a - 1 ? "s" : "",
	err: a => "\033[31mJPL: Error: " + a + "\033[0m",
	
	previous: {
		value: undefined,
		condition: undefined
	},
	vars: {
		FALSE: 0,
		TRUE: 1
	},
	cmd: {
		"p": [[String], (j, a) => a[0]],
		"+": [[Number, Number], (j, a) => a[0] + a[1]],
		"-": [[Number, Number], (j, a) => a[0] - a[1]],
		"*": [[Number, Number], (j, a) => a[0] * a[1]],
		"/": [[Number, Number], (j, a) => a[0] / a[1]],
		"%": [[Number, Number], (j, a) => a[0] % a[1]],
		"=": [[a => a, a => a], (j, a) => a[0] == a[1]],
		">": [[Number, Number], (j, a) => a[0] > a[1]],
		"<": [[Number, Number], (j, a) => a[0] < a[1]],
		"g": [[Number, Number], (j, a) => a[0] >= a[1]],
		"l": [[Number, Number], (j, a) => a[0] <= a[1]],
		"a": [[Boolean, Boolean], (j, a) => a[0] && a[1]],
		"o": [[Boolean, Boolean], (j, a) => a[0] || a[1]],
		"!": [[Boolean], (j, a) => !a[0]],
		"&": [[Number, Number], (j, a) => a[0] & a[1]],
		"|": [[Number, Number], (j, a) => a[0] | a[1]],
		"~": [[Number], (j, a) => ~a[0]],
		"^": [[Number, Number], (j, a) => a[0] ^ a[1]],
		"**": [[Number, Number], (j, a) => Math.pow(a[0], a[1])],
		"c": [[String, String], (j, a) => a[0] + a[1]],
		"s": [[String, a => a], function (j, a) {
			if (/^[a-z]+$/g.test(a[0])) {
				return j.err("Variable name '" + a[0] + "' is all lowercase");
			}
			
			return (j.vars[a[0]] = a[1]), "";
		}],
		"t": [[], function (j) {
			var p = j.previous.value;
			
			if (p === undefined) {
				return j.err("Nothing to take using 't'");
			}
			
			return p;
		}],
		"i": [[a => JSON.parse(String(a).toLowerCase()), String], (j, a) => (j.previous.condition = a[0]) ? a[1] : ""],
		"ei": [[a => JSON.parse(String(a).toLowerCase()), String], function (j, a) {
			j.previous.condition = !j.previous.condition && a[0];
			return j.previous.condition ? a[1] : "";
		}],
		"e": [[String], (j, a) => (j.previous.condition ^= 1) ? a[0] : ""]
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
			return [j.err("Function not found: '" + c + "'"), true, true];
		}
		
		var t = m[0].length;
		var n = s.length;
		
		if (n !== t) {
			return [j.err("Incorrect number of arguments: '" + c + "' takes " + t + " argument" + j.pl(t)), true, true];
		}
		
		for (var i = 0; i < n; i ++) {
			var k = s[i];
			var o = k.split(",");
			
			if (o.length < 2 && !/^[a-z]+$/g.test(k)) {
				if (/^[A-Za-z]+$/g.test(k)) {
					var v = j.vars[k];
					
					if (v) {
						a.push(v);
					} else {
						a.push([j.err("Variable '" + k + "' not found"), true, true]);
					}
				} else if (k.indexOf("\\") > -1) {
					a.push(k.replace(/\\/g, ""));
				} else {
					a.push(k);
				}
			} else {
				var l = j.exec(j, o.join(" "));
				a.push(l[2] ? l : l[0]);
			}
		}
		
		var r = m[1](j, a.map(function (e, i) {
			if (typeof e === "object" && e[2]) {
				return e[0] + ((i + 1) === a.length ? "" : "\n");
			}
			
			return m[0][i](e);
		}));
		
		j.previous.value = r;
		
		return [typeof r === "string" ? r : (r = JSON.stringify(r)), c !== "p" && r.length, false];
	}
};
