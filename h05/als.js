/* als.js */

String.prototype.trim = function() {
	/* trim12 by Steven Levithan */
	var str = this.replace(/^\s\s*/, '');
	var ws = /\s/;
	var i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i+1).toString();
}

var kakku = [ 1,                            // 0
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 1..10
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1  // 91..100
];

kakku.talleta = function(i, s) {
	if (this[i] == -1) {
		this[i] = s;
	}
}

var alkuluvut = [
	 2,  3,  5,  7, 11,
	13, 17, 19, 23, 29,
	31, 37, 41, 43, 47,
	53, 59, 61, 67, 71,
	73, 79, 83, 89, 97
];

alkuluvut.pienemmatKuin = function(n) {
	function ehto(e, i, a) {
		return (e <= n);
	}
	return this.filter(ehto);
}

function laske(nro, taso) {
	if (kakku[nro] != -1) return kakku[nro];

	var summa = 0;

	alkuluvut.pienemmatKuin(nro).forEach(function(n) {
		summa += laske(nro-n, taso+1);
	});

	kakku.talleta(nro, summa);

	return summa;
}

function handlaa(tapahtuma) {
	tapahtuma.preventDefault();

	var otto  = document.getElementById('otto');
	var nro   = parseInt(otto.value.trim().substring(0, 12));
	var alku  = (new Date).getTime();
	var tulos = (alkuluvut.indexOf(nro) == -1)? 0: -1;

	if (0 < nro && nro <= 100) {
		tulos += laske(nro, 0);
	}

	console.log("TULOS:: " + tulos);

	var loppu = (new Date).getTime();

	console.log("aika == " + (loppu - alku));

	kakkushow();

	return false;
}

function pakkaa(n) {
	var i = 0;
	var u = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
	while (n >= 1000) {
		n = Math.floor(n/1000);
		i++;
	}
	return n + u[i];
}

function kakkushow() {
	var merkki = null;

	for (var i=1; i<kakku.length; i++) {
		var solu = document.getElementById('k' + i);

		if (kakku[i] != -1) {
			merkki = pakkaa(kakku[i]);
			solu.className = "jaa";
		}
		else {
			merkki = '✕';
			solu.className = "ei";
		}

		var tila = document.createTextNode(merkki);

		while (solu.hasChildNodes()) {
			solu.removeChild(solu.lastChild);
		}

		solu.appendChild(tila);
	}
}

function alusta() {
	document.getElementById('lomake').addEventListener("submit", handlaa);
	document.getElementById('otto').focus();
	kakkushow();
}

window.addEventListener("load", alusta);
