import { path } from "../deps.ts";
import { decode } from "./disassembler/mod.ts";

const [listingNumber = "0037"] = Deno.args;

const cwd = Deno.cwd();
const binDir = path.join(cwd, "test/assets/bin");
const binFile = Array
  .from(Deno.readDirSync(binDir))
  .map((entry) => entry.name)
  .find((name) => name.includes(listingNumber));

if (binFile == null) {
  throw `Couldn't find listing #${listingNumber}.`;
}

const buffer = await Deno.readFile(path.join(binDir, binFile));

console.log(decode(buffer));
