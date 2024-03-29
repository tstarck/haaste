; print square of zeros and ones

%ifidn __OUTPUT_FORMAT__, elf32

%elifidn __OUTPUT_FORMAT__, elf64

%else
  %fatal -f elf32 or elf64 required!

%endif


section .data
      uinput:     db    0
      buf_sz:     db    255

      zerone:     dw    0x3031
                  dw    0x3130

      mem_at:     dd    0
      mem_sz:     dd    0

      in_msg:     db    'input> '
      in_len:     equ   $-in_msg

      er_msg:     db    'error.', 0x0a
      er_len:     equ   $-er_msg

section .bss
      buffer:     resb  255

section .text
      global _start


_start:
      mov   eax, 4            ; sys_write
      mov   ebx, 1            ; stdout
      mov   ecx, in_msg
      mov   edx, in_len
      int   80h               ; write prompt

      mov   eax, 3            ; sys_read
      mov   ebx, 2            ; stdin
      mov   ecx, buffer
      mov   edx, buf_sz
      int   80h               ; read user input

      test  eax, eax
      js    .error            ; exit on error (-1)

      mov   ecx, 0            ; ecx is next used as
                              ; exit code or counter
      sub   eax, 1
      test  eax, eax
      jz    .quit             ; no input given :-(

      mov   esi, buffer       ;;; parse input
.nextint:
      mov   dl, byte [esi]    ; take a byte
      inc   esi               ; (*buffer)++

      sub   dl, 48            ; cheap atoi(3)
      imul  ecx, 10
      add   cl, dl

      sub   eax, 1            ; if there's
      test  eax, eax          ; more to read,
      jnz   .nextint          ; read more

      and   ecx, 0xff         ; 255^2 ought to be enough for anybody
      test  ecx, ecx          ; test for zero || bail out
      jz    .quit             ; jecxz jumps too short!

      mov   [uinput], cl      ; save user input

      mov   eax, ecx          ; calc required memory
      inc   eax               ; n(n+1) is always even, which is nice
      mul   ecx

      mov   ecx, eax
      mov   [mem_sz], eax     ; save for later

      mov   eax, 45           ;;; reserve memory
      mov   ebx, 0
      int   80h               ; get original break..

      mov   edi, eax          ; ..and keep it

      add   eax, ecx
      mov   ebx, eax
      mov   eax, 45
      int   80h               ; new break at eax if success

      test  edi, eax          ; old and new break
      je    .quit             ; should NOT be equal (see brk(2))

      mov   [mem_at], edi     ; save mem ptr

      mov   ax, word [zerone] ;;; initialize memory
      shr   ecx, 1
      rep   stosw             ; write zero-one pattern

      mov   bl, [uinput]
      and   ebx, 0x01
      test  bl, bl            ; no need to redo even rows,
      jz    .odd              ; if user input is an odd number..

      mov   bl, [uinput]
      cmp   bl, 1
      je    .odd              ; ..or number 1

      shr   bl, 1             ;;; rewrite odd rows
      mov   ax, [zerone+2]
      mov   edi, [mem_at]
.even:
      mov   cl, [uinput]
      add   edi, ecx
      inc   edi
      shr   ecx, 1
      inc   ecx
      rep   stosw

      dec   ebx
      test  ebx, ebx
      jnz   .even

.odd:
      mov   eax, 0x0a         ;;; insert newlines
      mov   edi, [mem_at]
      mov   cl, [uinput]
      mov   edx, ecx
      inc   edx
.newlines:
      add   edi, edx
      mov   [edi], al
      loop  .newlines

      mov   eax, 4            ;;; print
      mov   ebx, 1
      mov   ecx, [mem_at]
      mov   edx, [mem_sz]
      inc   ecx
      int   80h

.quit:
      mov   ebx, 0            ;;; exit(0)
      mov   eax, 1
      int   80h

.error:
      mov   eax, 4            ; print error
      mov   ebx, 1
      mov   ecx, er_msg
      mov   edx, er_len
      int   80h
      mov   eax, 1            ; exit(1)
      mov   ebx, 1
      int   80h
