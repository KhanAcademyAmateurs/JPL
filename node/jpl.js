module.exports = {
	cmd: {
		"+": [[Number, Number], function (a) {
			return a[0] + a[1];
		}],
		"-": [[Number, Number], function (a) {
			return a[0] - a[1];
		}]
	},
	exec: function (j, s) {
		s = s.replace(/^ +/, "").split(" ");
		c = s.shift();
		a = [];
		
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
		console.log(a);
		var m = j.cmd[c];
		
		if (!m) {
			return "JPL: Error: Function not found: '" + c + "'";
		}
		
		return m[1](a.map(function (e, i) {
			return m[0][i](e);
		}));
	}
};
