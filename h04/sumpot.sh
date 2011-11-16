#!/bin/bash

for FOO in $(seq 8 18); do
	echo FOO on $FOO
	for nro in $(echo "pows($FOO)" | bc sumpot.bc); do
		SUM=$(echo $nro | sed 's/\(.\)/+\1/g;s/+//' | bc)
		if [ "$FOO" == "$SUM" ]; then
			echo jee $FOO ja $nro
		fi
	done
done
