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
		s = s.split(" ");
		c = s.shift();
		a = [];
		
		if (c === "$") {
			return "";
		}
		console.log(c);
		for (var i = 0; i < s.length; i ++) {
			var k = s[i];
			var o = k.split(",");
			
			if (k === o) {
				a.push(k);
			} else {
				a.push(j.exec(j, o.join(" ")));
			}
		}
		console.log(c);
		var m = j.cmd[c];
		
		if (!m) {
			return "JPL: Error: Function not found: '" + c + "'";
		}
		
		return j.cmd[c](a);
	}
};
