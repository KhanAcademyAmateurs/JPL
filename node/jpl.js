module.exports = {
	cmd: {
		"p": [[JSON.stringify], (j, a) => a],
		"+": [[Number, Number], (j, a) => a[0] + a[1]],
		"-": [[Number, Number], (j, a) => a[0] - a[1]],
		"s": [[String, a => a], function (j, a) {
			if (a[0].test(/^[a-z]+$/)) {
				return "JPL: Error: Variable name '" + a[0] + "' is all lowercase";
			}
			
			j.vars[a[0]] = a[1];
		}]
	},
	vars: {},
	exec: function (j, s) {
		s = s.replace(/^ +/, "").split(" ");
		var c = s.shift();
		var a = [];
		
		if (c === "$" || !c.length) {
			return "";
		}
		
		for (var i = 0; i < s.length; i ++) {
			var k = s[i];
			var o = k.split(",");
			
			if (o.length < 2) {
				a.push(k);
			} else {
				a.push(j.exec(j, o.join(" ")));
			}
		}
		
		var m = j.cmd[c];
		
		if (!m) {
			return "JPL: Error: Function not found: '" + c + "'";
		}
		
		return JSON.stringify(m[1](j, a.map(function (e, i) {
			return m[0][i](e);
		}))) + (c === "p" ? "" : "\n");
	}
};
