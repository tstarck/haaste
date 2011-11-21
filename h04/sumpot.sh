#!/bin/bash

if [ ! -f sumpot.bc ]; then
	echo error: sumpot.bc is missing
	exit 1
fi

for NRO in $(seq 2 450); do
	echo "e=p($NRO)" | bc sumpot.bc
done | sort -n

exit 0
