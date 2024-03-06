import { path } from "../deps.ts";
import { decode } from "./disassembler/mod.ts";

const [listingNumber = "0037"] = Deno.args;
const saveFlag = Deno.args.includes("--save") || Deno.args.includes("-s");

const cwd = Deno.cwd();
const tmpDir = path.join(cwd, "test/assets/tmp");
const binDir = path.join(cwd, "test/assets/bin");
const binFile = Array
  .from(Deno.readDirSync(binDir))
  .map((entry) => entry.name)
  .find((name) => name.includes(listingNumber));
const asmFile = `${binFile}.asm`;

if (binFile == null) {
  throw `Couldn't find listing #${listingNumber}.`;
}

const originalBuffer = await Deno.readFile(path.join(binDir, binFile));

const assemblyCode = decode(originalBuffer);

console.log("\nAssembly code:");
console.log("=========================\n");
console.log(assemblyCode.split("\n").map((str) => `  ${str}`).join("\n"));
console.log("=========================\n");

try {
  await Deno.mkdir(tmpDir);
// deno-lint-ignore no-unused-vars
} catch (ex) {
  // Ignore error if directory already exists.
}

await Deno.writeTextFile(path.join(tmpDir, asmFile), assemblyCode);

const args = [
  "-f",
  "bin",
  path.join(tmpDir, asmFile),
  "-o",
  path.join(tmpDir, binFile),
  "-Z",
  path.join(cwd, "nasm-logs.txt"),
];
const { success } = await new Deno.Command("nasm", { args }).output();

if (success) {
  console.log(`"${binFile}" was successfully compiled.`);
} else {
  console.error(`NASM was unable to compile the result ASM code into "${binFile}". Check out \"nasm.logs.txt\" for details.`);
}

const resultBuffer = await Deno.readFile(path.join(tmpDir, binFile));

const buffersAreEqual = resultBuffer.every((num, index) => num === originalBuffer[index]);

if (buffersAreEqual) {
  console.log("\nSuccess! The origin & newly compiled binaries are equal.\n");
} else {
  console.error("\nError: The origin & newly compiled binaries are not equal\n");
}

if (!saveFlag) {
  await Deno
    .remove(tmpDir, { recursive: true })
    .then(() => console.log("\"tmp\" folder was removed.\n"));
} else {
  console.log("\"--save\" flag detected. \"tmp\" folder won't be removed.")
}
