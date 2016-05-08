function recurFib(n) {
	if (n < 2) {
		return n;
	} else {
		return recurFib(n - 1) + recurFib(n - 2);
	}

}


console.log(recurFib(10)); //55

function iterFib(n) {
	var last = 1;
	var nextLast = 1;
	var result = 1;

	if (n == 0) {
		return 0;
	}

	for (var i = 2; i < n; i++) {
		result = last + nextLast;
		nextLast = last;
		last = result;
	}

	return result;
}

console.log(iterFib(10));//55