module.exports = {
	vars: {},
	cmd: {
		"p": [[JSON.stringify], (j, a) => a[0]],
		"+": [[Number, Number], (j, a) => a[0] + a[1]],
		"-": [[Number, Number], (j, a) => a[0] - a[1]],
		"c": [[String, String], (j, a) => a[0] + a[1]],
		"g": [[String], function (j, a) {
			return j.vars[a[0]];
		}],
		"s": [[String, a => a], function (j, a) {
			if (/^[a-z]+$/g.test(a[0])) {
				return "JPL: Error: Variable name '" + a[0] + "' is all lowercase";
			}
			
			j.vars[a[0]] = a[1];
		}]
	},
	exec: function (j, s) {
		s = s.replace(/^ +/, "").split(" ");
		var c = s.shift();
		var a = [];
		
		if (c === "$" || !c.length) {
			return ["", false];
		}
		
		for (var i = 0; i < s.length; i ++) {
			var k = s[i];
			var o = k.split(",");
			
			if (o.length < 2) {
				a.push(k);
			} else {
				a.push(j.exec(j, o.join(" "))[0]);
			}
		}
		
		var m = j.cmd[c];
		
		if (!m) {
			return ["JPL: Error: Function not found: '" + c + "'", true];
		}
		
		var r = m[1](j, a.map(function (e, i) {
			return m[0][i](e);
		}));
		
		return [typeof r === "string" ? r : JSON.stringify(r), c === "p"];
	}
};
