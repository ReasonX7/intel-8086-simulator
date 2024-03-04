import { join } from "node:path";
import type { Byte } from "./binary.ts";
import { decode } from "./instructions";

const cwd = process.cwd();
const binDir = join(cwd, "test/bin");
const binFile = join(binDir, "listing-0037-single-register-mov");

const buffer = await Bun.file(binFile).arrayBuffer();
const bytes = new Uint8Array(buffer) as Byte[];

const result = decode(Array.from(bytes));

console.log(result);
