// program/v1 entry: write one short toaster error line to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ENTRY =
  "E07: Toast too dark. Available shades: pale, lighter, bright. Selected: emotional damage.";

function validatedText(): string {
  if (typeof ENTRY !== "string" || ENTRY.length < 1 || ENTRY.length > 120) {
    throw new Error("entry must be 1..120 characters");
  }
  if (!/^[\x20-\x7e]+$/.test(ENTRY)) {
    throw new Error("entry must be one printable ASCII line");
  }
  return ENTRY;
}

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return resolve(fromEnv && fromEnv.trim() ? fromEnv : "/output");
}

export function main(): void {
  const target = resolve(outputDir(), "entry.txt");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, validatedText(), { encoding: "utf8", flag: "w" });
}

main();
