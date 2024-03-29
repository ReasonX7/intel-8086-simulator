<!-- deno-fmt-ignore-file -->

# intel-8086-simulator

An emulator of 8086 processor that I develop within
[Performance-Aware Programming](https://www.computerenhance.com/p/table-of-contents) course.

## Development

The project is written using [Deno](https://deno.com/) v1.4+.

To run the project locally you'll need a [NASM](https://www.nasm.us/) installation. This is an
Assembler compiler, which is used to compile test `*.asm` files.

After cloning the repository run `deno task setup` to compile test `*.asm` files & install Git
hooks.

Run the main program:

```bash
deno task main [listingNumber]
```

> `listingNumber` is the number of one of `*.asm` files in `test/assets/bin` directory.

Example:

```bash
deno task main 0037
```

All tasks:

```bash
deno task main [listingNumber]    # Runs the main program.
deno task dev                     # Runs the main program in watch mode.
deno task check                   # Runs formatter and linter.
deno task prepare                 # Compiles test `*.asm` files.
```

## Project Structure

- `scripts` - Scripts for repository setup;
- `src` - Source code;
  - `disassembler` - Converting binary back to ASM;
  - `utils` - Common utility functions;
- `test` - Test files;
  - `asm` - Source ASM for compilation by `deno task prepare`;
  - `bin` - Binaries compiled by `deno task prepare`;
- `deps.ts` - All Deno dependencies must be specified here.

## Functionality

List of all 8086 instructions can be found in
[the 8086 manual](https://archive.org/details/bitsavers_intel80869lyUsersManualOct79_62967963/page/n260/mode/1up).

Currently implemented instructions:

| Command | `7 6 5 4 3 2 1 0` | `7 6 5 4 3 2 1 0` |
|---------|-------------------|-------------------|
| `mov`   | `1 0 0 0 1 0 d w` | `mod reg   r/m  ` |
