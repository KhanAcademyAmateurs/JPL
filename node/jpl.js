module.exports = {
	exec: function (s) {
		s = s.split(" ");
		c = s.shift();
		
		return (a = {
			"+": [[Number, Number], function (a) {
				return a[0] + a[1];
			}]
		}[c]) ? a[1](s.map(function (e, i) {
			return a[0][i](e);
		})) : "JPL Error: Function not found";
	}
};
