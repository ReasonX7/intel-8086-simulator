#!/bin/bash

asm_src="./test/assets/asm"
asm_bin="./test/assets/bin"

mkdir -p $asm_bin

echo "Building ASM test binaries:"

for entry in $asm_src/*
do
  file=$(basename "$entry" | cut -d. -f1)
  output="$asm_bin/$file"

  echo "  $file"
  nasm -f bin $entry -o $output
done
