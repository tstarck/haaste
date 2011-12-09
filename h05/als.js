/* als.js */

String.prototype.trim = function() {
	/* trim12 by Steven Levithan */
	var str = this.replace(/^\s\s*/, '');
	var ws = /\s/;
	var i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i+1).toString();
}

var __depth = 0;
var __cachehit = 0;
var __cachemiss = 0;

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

var kakku = [ 0,
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

kakku.merkkijonoksi = function(i) {
	if (this[i] == -1) return '✕';
	else return this[i].toString();
}

function tulosta(nro, tulos, kulunut) {
	var tuloslista = document.getElementById('tulot');

	var p      = document.createElement('p');

	var strong = document.createElement('strong');
	var tulos  = document.createTextNode(tulos);

	var syote  = document.createTextNode('Syöte: ');
	var b      = document.createElement('b');
	var nro    = document.createTextNode(nro);
	var aika   = document.createTextNode('Aika: ');
	var em     = document.createElement('em');
	var kello  = document.createTextNode(kulunut + ' ms');
	var syvyys = document.createTextNode('Rekursion syvyys: ' + __depth);
	var br     = document.createElement('br');

	var kakku  = document.createTextNode('Välimuisti: ');
	var hit    = document.createElement('span');
	var osumia = document.createTextNode('osumia ' + __cachehit);
	var kautta = document.createTextNode(' / ');
	var miss   = document.createElement('span');
	var huteja = document.createTextNode('huteja ' + __cachemiss);

	hit.className = "hit";
	miss.className = "miss";

	strong.appendChild(tulos);
	b.appendChild(nro);
	em.appendChild(kello);
	hit.appendChild(osumia);
	miss.appendChild(huteja);

	p.appendChild(strong);
	p.appendChild(syote);
	p.appendChild(b);
	p.appendChild(aika);
	p.appendChild(em);
	p.appendChild(syvyys);
	p.appendChild(br);
	p.appendChild(kakku);
	p.appendChild(hit);
	p.appendChild(kautta);
	p.appendChild(miss);

	tuloslista.insertBefore(p, tuloslista.firstChild);
}

function kakkushow() {
	var lista = document.getElementById('kakku');

	while (lista.hasChildNodes()) {
		lista.removeChild(lista.lastChild);
	}

	for (var i=1; i<kakku.length; i++) {
		var otus = document.createElement('li');
		var sana = document.createTextNode(kakku.merkkijonoksi(i));

		if (i == 1 || i%10 == 0) otus.className = "kynppi";

		otus.appendChild(sana);
		lista.appendChild(otus);
	}
}

function laske(nro, taso) {
	if (taso > __depth) __depth = taso;

	if (nro == 0) return 1;

	if (kakku[nro] != -1) {
		__cachehit++;
		return kakku[nro];
	}
	else {
		__cachemiss++;
	}

	var summa = 0;

	alkuluvut.pienemmatKuin(nro).forEach(function(n) {
		summa += laske(nro-n, taso+1);
	});

	kakku.talleta(nro, summa);

	return summa;
}

function handlaa(tapahtuma) {
	tapahtuma.preventDefault();

	__depth = 0;
	__cachehit = 0;
	__cachemiss = 0;

	var otto  = document.getElementById('otto');
	var nro   = parseInt(otto.value.trim().substring(0, 12));
	var alku  = (new Date).getTime();
	var tulos = (alkuluvut.indexOf(nro) == -1)? 0: -1;

	if (isNaN(nro) || nro <= 0 || 100 < nro) {
		alert("Luvun tulee olla numero väliltä 1..100!");
		return false;
	}

	tulos += laske(nro, 0);

	var loppu = (new Date).getTime();

	tulosta(nro, tulos, (loppu - alku));

	kakkushow();

	return false;
}

function alusta() {
	document.getElementById('lomake').addEventListener("submit", handlaa);
	document.getElementById('otto').focus();
	kakkushow();
}

window.addEventListener("load", alusta);
