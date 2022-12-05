import { readInput } from "../lib";

type Range = {
  from: number;
  to: number;
};

function completelyOverlaps(
  { from: leftFrom, to: leftTo }: Range,
  { from: rightFrom, to: rightTo }: Range
): boolean {
  return (
    (leftFrom >= rightFrom && leftTo <= rightTo) ||
    (rightFrom >= leftFrom && rightTo <= leftTo)
  );
}

function overlaps(
  { from: leftFrom, to: leftTo }: Range,
  { from: rightFrom, to: rightTo }: Range
): boolean {
  return !(
    leftFrom > rightTo ||
    rightFrom > leftTo ||
    leftTo < rightFrom ||
    rightTo < leftFrom
  );
}

async function main() {
  const data = await readInput(__dirname);
  const lines = data.split("\n");
  const halves = lines.map((line) =>
    line.split(",").map((half) => {
      const [from, to] = half.split("-").map(Number);
      return { from, to };
    })
  );

  let sum = 0;
  for (const [left, right] of halves) {
    if (completelyOverlaps(left, right)) {
      sum += 1;
    }
  }
  console.log("Part 1", sum);

  sum = 0;
  for (const [left, right] of halves) {
    if (overlaps(left, right)) {
      sum += 1;
    }
  }
  console.log("Part 2", sum);
}

main();
