import { path } from "../deps.ts";

const cwd = Deno.cwd();

const testAssetsDir = path.join(cwd, "test/assets");
const asmDir = path.join(testAssetsDir, "asm");
const binDir = path.join(testAssetsDir, "bin");

for await (const { name } of Deno.readDir(asmDir)) {
  const args = ["-f", "bin", path.join(asmDir, name), "-o", path.join(binDir, name.slice(0, -4))];
  await new Deno.Command("nasm", { args }).output();
}
