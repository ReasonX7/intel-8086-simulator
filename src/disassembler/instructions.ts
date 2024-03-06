import type { Bit, Byte, TripleBit } from "./binary.ts";
import { List } from "../utils/mod.ts";
type FieldName = "w" | "d" | "reg" | "mod" | "r/m";
type Field = { name: string; size: number };
type Registry = Field & { word: Bit; code: TripleBit };
const singleBitMask = 0b1;
const doubleBitMask = 0b11;
const tripleBitMask = 0b111;
const getMaskBySize = (size: number) => {
  switch (size) {
    case 1:
      return singleBitMask;
    case 2:
      return doubleBitMask;
    case 3:
      return tripleBitMask;
    default:
      throw new Error(`Unknown size: ${size}`);
  }
}; /**
 * @param name - String representation.
 * @param size - How many bits the field takes.
 */
const createField = (name: string, size: 1 | 2 | 3): Field => ({ name, size });
const createRegistry = (
  name: string,
  word: Bit,
  code: TripleBit,
): Registry => ({ code, word, ...createField(name, 3) });
const wordField = createField("w", 1);
const directionField = createField("d", 1);
const modField = createField("mod", 2);
const registryField = createField("reg", 3);
const registerOrMemoryField = createField("r/m", 3);
const fieldNameToField = {
  w: wordField,
  d: directionField,
  mod: modField,
  reg: registryField,
  "r/m": registerOrMemoryField,
};
const byteRegisters = ["al", "cl", "dl", "bl", "ah", "ch", "dh", "bh"].map((
  name,
  index,
) => createRegistry(name, 0, index as TripleBit));
const wordRegisters = ["ax", "cx", "dx", "bx", "ah", "ch", "dh", "bh"].map((
  name,
  index,
) => createRegistry(name, 1, index as TripleBit));
const registers = [byteRegisters, wordRegisters];
const fieldArrayToMatrix = (fields: Field[]) => {
  return fields.reduceRight<Field[][]>((prevMatrix, field) => {
    List.unshift(prevMatrix[0], field);
    const sizeSum = prevMatrix[0].map((f) => f.size).reduce((result, size) =>
      result + size
    );
    if (sizeSum === 8) return List.unshift(prevMatrix, []);
    return prevMatrix;
  }, [[]]);
};
const createInstrDecoder = (
  operation: string,
  code: Byte,
  ...fieldNames: FieldName[]
) => {
  const allFields = fieldNames.map((name) => fieldNameToField[name]);
  const fieldMatrix = fieldArrayToMatrix(allFields);
  const firstByteFieldsSize = fieldMatrix[0].reduce(
    (size, field) => size + field.size,
    0,
  );
  return (bytes: Uint8Array): string | null => {
    const firstByteCode = bytes[0] >> firstByteFieldsSize;
    if (firstByteCode !== code) return null;
    let word = 0; // let direction = 0;
    // let mod = 0;
    const operands = [];
    for (let i = 0; i < fieldMatrix.length; i++) {
      const fields = fieldMatrix[i];
      const byte = bytes[i];
      let bitOffset = 0;
      let code = 0;
      for (let j = fields.length - 1; j > 0; j--) {
        const field = fields[j];
        const offsetByte = byte >> bitOffset;
        code = offsetByte & getMaskBySize(field.size);
        bitOffset += field.size;
        switch (field.name) {
          case "w":
            word = code;
            break;
            //   direction = code;
            //   break;
            // case "b":
          case "reg":
            operands.push(registers[word][code]);
            break;
            //   mod = code;
            //   break;
            // case "mod":
          case "r/m":
            operands.push(registers[word][code]);
            break;
        }
      }
    }
    return `${operation} ${operands.map((o) => o.name).join(", ")}`;
  };
};
const instrDecoders = [
  createInstrDecoder("mov", 0b100010, "d", "w", "mod", "reg", "r/m"),
];
export const decode = (inputBytes: Uint8Array) => {
  for (const decoder of instrDecoders) {
    const result = decoder(inputBytes);
    if (result) return result;
  }
};
