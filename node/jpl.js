function jpl (s) {
	s = s.split(" ");
	c = s.shift();
	
	(a = {
		"+": function (a) {
			return a[0] + a[1];
		}
	}[c]) ? a(s) : "JPL Error: Function not found";
}
