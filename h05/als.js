/* als.js */

var kakku = [
	0, 0, 1, 1, 0, 1, 0, 1, 0, 0,
	0, 1, 0, 1, 0, 0, 0, 1, 0, 1,
	0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
	0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
	0, 1, 0, 1, 0, 0, 0, 1, 0, 0,
	0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
	0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
	0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
	0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
];

String.prototype.trim = function() {
	/* trim12 by Steven Levithan */
	var str = this.replace(/^\s\s*/, '');
	var ws = /\s/;
	var i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i+1).toString();
}

function laskeAikuistenOikeesti(n) {
	// console.log("laskeAikuistenOikeesti(" + n + ")");

	var i = n-2;
	var j = 2;

	while (i >= 2 && j <= n) {
		console.log("[i, j] :: [" + i + ", " + j + "]");

		laske(i) + laske(j);

		i--;
		j++;
	}

	/*
	for (var i=n, j=2; i>=2 && j<=n; i++) {
		--j;
		console.log("[i, j] :: [" + i + ", " + j + "]");
	}
	*/
}

function laske(n) {
	console.log("laske(" + n + ")");

	if (kakku[n] != 0) {
		console.log("kakku hitti @" + n);
		return kakku[n];
	}
	else {
		console.log("kakku huti  @" + n);
		return laskeAikuistenOikeesti(n);
	}
}

function handlaa(tapahtuma) {
	tapahtuma.preventDefault();

	console.log("; -- -- -- -- -- -- -- -- ;");

	var otto = document.getElementById('otto');
	var nro = parseInt(otto.value.trim().substring(0, 12));
	var alku = (new Date).getTime();

	console.log("nro :: " + nro);
	console.log("alku  > " + alku);

	console.log("TULOS :: " + laske(nro));

	var loppu = (new Date).getTime();
	console.log("loppu < " + loppu);
	console.log("matka = " + (loppu - alku));

	return false;
}

function esitäKakku() {
	var merkki = null;

	for (var i=0; i<kakku.length; i++) {
		var solu = document.getElementById('s' + i);

		if (kakku[i] != 0) {
			merkki = kakku[i];
			solu.className = "jaa";
		}
		else {
			merkki = '✕';
			solu.className = "ei";
		}

		var tila = document.createTextNode(merkki);

		solu.appendChild(tila);
	}
}

function alusta() {
	document.getElementById('lomake').addEventListener("submit", handlaa);

	document.getElementById('otto').focus();

	esitäKakku();
}

window.addEventListener("load", alusta);
