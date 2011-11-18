#!/bin/bash

sumpot() {
	for NRO in $(seq $1 $2); do
		for TULO in $(echo "p($NRO)" | bc sumpot.bc); do
			SUM=$(echo $TULO | sed 's/\(.\)/+\1/g;s/+//' | bc)
			if [ "$NRO" == "$SUM" ]; then
				echo $TULO
			fi
		done
	done
}

sumpot   2  20 &
sumpot  21  52 &
sumpot  53  94 &
sumpot  95 156 &
sumpot 157 228 &
sumpot 229 300 &
sumpot 301 382 &
sumpot 383 450 &

wait && exit 0
