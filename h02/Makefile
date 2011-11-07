CFLAGS=-O2 -ansi -pedantic -Wall

all: spiraali

spiraali: spiraali.o
	$(CC) $(CFLAGS) -o $@ $?

spiraali.o: spiraali.c
	$(CC) $(CFLAGS) -c $^

clean:
	rm -f *.o spiraali
