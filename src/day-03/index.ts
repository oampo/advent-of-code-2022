import * as assert from "assert";
import { readInput } from "../lib";

function union<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const value of setA) {
    if (setB.has(value)) {
      result.add(value);
    }
  }
  return result;
}

function value(char: string): number {
  const charCode = char.charCodeAt(0);
  return charCode > 96 ? charCode - 96 : charCode - 38;
}

async function main() {
  const data = await readInput(__dirname);
  const lines = data.split("\n");
  const halves = lines.map((line) => [
    line.slice(0, line.length / 2),
    line.slice(line.length / 2),
  ]);

  let sum = 0;
  for (const [left, right] of halves) {
    const set = new Set(left.split(""));
    for (const char of right) {
      if (set.has(char)) {
        sum += value(char);
        break;
      }
    }
  }

  console.log("Part 1", sum);

  sum = 0;
  for (let i = 0; i < lines.length; i += 3) {
    const setA = new Set(lines[i].split(""));
    const setB = new Set(lines[i + 1].split(""));
    const setC = new Set(lines[i + 2].split(""));
    const unionABC = union(setA, union(setB, setC));
    assert(unionABC.size === 1);
    sum += value(Array.from(unionABC.values())[0]);
  }
  console.log("Part 2", sum);
}

main();
