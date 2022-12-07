import { readInput, groupLines, checkExists } from "../lib";

type Instruction = {
  count: number;
  from: number;
  to: number;
};

function parseInstruction(s: string): Instruction {
  const match = checkExists(s.match(/move (\d+) from (\d+) to (\d+)/));
  const [count, from, to] = [match[1], match[2], match[3]].map(Number);
  return { count, from: from - 1, to: to - 1 };
}

function part1(stacks: string[][], instructions: Instruction[]) {
  for (const { count, from, to } of instructions) {
    for (let i = 0; i < count; i++) {
      const char = checkExists(stacks[from].pop());
      stacks[to].push(char);
    }
  }

  const result = stacks.map((stack) => stack[stack.length - 1]).join("");
  console.log("Part 1:", result);
}

function part2(stacks: string[][], instructions: Instruction[]) {
  for (const { count, from, to } of instructions) {
    const chars = stacks[from].splice(stacks[from].length - count, count);
    stacks[to].push(...chars);
  }

  const result = stacks.map((stack) => stack[stack.length - 1]).join("");
  console.log("Part 2:", result);
}

async function main() {
  const data = await readInput(__dirname);
  const lines = data.split("\n");
  const [crates, instructions] = groupLines(lines);
  const stackIndexLine = crates[crates.length - 1];
  const stackIndices = [];
  for (let i = 0; i < stackIndexLine.length; i++) {
    if (stackIndexLine[i] !== " ") {
      stackIndices.push(i);
    }
  }

  const stacks: string[][] = Array.from(stackIndices, () => []);
  for (let i = crates.length - 2; i >= 0; i--) {
    const row = crates[i];
    for (const [j, index] of stackIndices.entries()) {
      const char = row[index];
      if (char != null && char !== " ") {
        stacks[j].push(char);
      }
    }
  }

  const parsed = instructions.map(parseInstruction);

  part1(
    stacks.map((s) => [...s]),
    parsed
  );
  part2(
    stacks.map((s) => [...s]),
    parsed
  );
}

main();
