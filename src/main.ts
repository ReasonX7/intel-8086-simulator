import { path } from "../deps.ts";
import { decode } from "./disassembler/mod.ts";

const cwd = Deno.cwd();
const binDir = path.join(cwd, "test/assets/bin");
const binFile = path.join(binDir, "listing-0037-single-register-mov");

const buffer = await Deno.readFile(binFile);

decode(buffer);
