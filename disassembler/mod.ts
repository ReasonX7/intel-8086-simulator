import type { Byte } from "./binary.ts";

import { decode } from "./instructions.ts";
import { path } from "../deps.ts";

const cwd = Deno.cwd();
const binDir = path.join(cwd, "test/assets/bin");
const binFile = path.join(binDir, "listing-0037-single-register-mov");

const buffer = await Deno.readFile(binFile);

decode(buffer);

export { decode };
