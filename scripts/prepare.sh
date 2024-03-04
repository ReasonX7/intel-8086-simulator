#!/bin/bash

asm_src="./test/asm"
asm_bin="./test/bin"

mkdir -p $asm_bin

echo "Build ASM test binaries:"

for entry in $asm_src/*
do
  file=$(basename "$entry" | cut -d. -f1)
  output="$asm_bin/$file"

  echo "  $file"
  nasm -f bin $entry -o $output
done
