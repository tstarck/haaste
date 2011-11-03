LD=ld -s
ASM=nasm -Ox -Wall

all: elf64

elf32: clean
	$(ASM) -f elf32 nollayx.asm
	$(LD) -o nollayx nollayx.o

elf64: clean
	$(ASM) -f elf64 nollayx.asm
	$(LD) -o nollayx nollayx.o

clean:
	rm -f *.o nollayx
