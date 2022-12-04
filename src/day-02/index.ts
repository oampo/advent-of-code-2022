import { readInput, checkExists } from "../lib";

const outcomeTable = [
  [3, 6, 0],
  [0, 3, 6],
  [6, 0, 3],
];

const themIndices = new Map([
  ["A", 0],
  ["B", 1],
  ["C", 2],
]);
const usIndices = new Map([
  ["X", 0],
  ["Y", 1],
  ["Z", 2],
]);

function scoreGame(lines: { themIndex: number; usIndex: number }[]): number {
  let totalScore = 0;
  for (const { themIndex, usIndex } of lines) {
    totalScore += usIndex + 1 + outcomeTable[themIndex][usIndex];
  }
  return totalScore;
}

async function main() {
  const data = await readInput(__dirname, "input.txt");
  const lines = data.split("\n").map((line) => {
    const [them, us] = line.split(" ");
    const themIndex = checkExists(themIndices.get(them));
    const usIndex = checkExists(usIndices.get(us));
    return { themIndex, usIndex };
  });

  console.log("Part 1", scoreGame(lines));

  const newLines = lines.map(({ themIndex, usIndex }) => {
    if (usIndex === 0) {
      return { themIndex, usIndex: (themIndex + 2) % 3 };
    }
    if (usIndex === 1) {
      return { themIndex, usIndex: themIndex };
    } else if (usIndex === 2) {
      return { themIndex, usIndex: (themIndex + 1) % 3 };
    } else {
      throw new Error("Unexpected value");
    }
  });

  console.log("Part 2", scoreGame(newLines));
}

main();
