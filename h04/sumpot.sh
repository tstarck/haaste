#!/bin/bash

if [ ! -f sumpot.bc ]; then
	echo error: sumpot.bc is missing
	exit 1
fi

sumpot() {
	for NRO in $(seq $1 $2); do
		for TULO in $(echo "e=p($NRO)" | bc sumpot.bc); do
			SUM=$(echo $TULO | sed 's/\(.\)/+\1/g;s/+//' | bc)
			if [ "$NRO" == "$SUM" ]; then
				echo $TULO
			fi
		done
	done
}

sumpot   2  24 &
sumpot  25  60 &
sumpot  61 102 &
sumpot 103 162 &
sumpot 163 230 &
sumpot 231 301 &
sumpot 302 378 &
sumpot 379 450 &

wait && exit 0
