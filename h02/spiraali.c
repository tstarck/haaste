/* spiraali.c
 * Lukuspiraali vakiomuistissa
 */

#include <stdio.h>
#include <stdlib.h>
#include <err.h>

#define BACK  0
#define FORTH 1

#define E_ZOMGLOL "error: this should not happen"

typedef int direction;

int numberAt(int i, int j) {
	int x = 0;
	int y = 0;
	int steps = 0;
	int number = 1;
	direction go = FORTH;

	while (x != i || y != j) {
		if (steps > 0) {
			if (go == BACK) y++;
			else x++;
			steps--;
		}
		else if (y == 0) {
			if (go == FORTH) {
				x++;
				go = BACK;
			}
			else {
				y++;
				steps = x-1;
			}
		}
		else if (x == 0) {
			if (go == BACK) {
				y++;
				go = FORTH;
			}
			else {
				x++;
				steps = y-1;
			}
		}
		else if (go == BACK) {
			x--;
		}
		else if (go == FORTH) {
			y--;
		}
		else {
			errx(EXIT_FAILURE, E_ZOMGLOL);
		}

		number++;
	}

	return number;
}

int main(int argc, char **argv) {
	int i, j;
	int luku = 0;
	int pituus = 1;

	printf("Minkäs verran laitetaan? ");

	if (scanf("%i", &luku) != 1)
		errx(EXIT_FAILURE, "Anna luku. Ihan oikeesti.");

	if (luku < 0)
		errx(EXIT_FAILURE, "Mene muualle negaamaan!");

	if (luku == 0)
		return 0;

	if (luku >= 4)  pituus++;
	if (luku >= 10) pituus++;
	if (luku >= 32) pituus++;

	for (j=0; j<luku; j++) {
		for (i=0; i<luku; i++) {
			printf(" %*i", pituus, numberAt(i, j));
		}
		printf("\n");
	}

	return 0;
}
