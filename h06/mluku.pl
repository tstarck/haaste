#!/usr/bin/perl

use strict;

sub f{
	my@a;
	my$b=shift;
	for (my$c=2; $c<=$b; $c++) {
		next if $b%$c;
		$b/=$c;
		push @a,$c;
		redo;
	}
	return @a;
}

sub ml{
	$\="\n";
	my$s=0;
	my($a,$b,@c) = @_;

	return "Ei saa kokonaislukua." unless $b;
	unshift @c, $a;

	foreach (f($b)) {
		$s++;
		for (my$i=0; $i<scalar@c; $i++) {
			unless ($c[$i]%$_) {
				$c[$i]/=$_;
				$s--;
				last;
			}
		}
	}

	return "Ei saa kokonaislukua." if $s;
	return "Saa kokonaisluvun.";
}

print "Murtoluku> ";
exit print ml(split /\//,<>);
