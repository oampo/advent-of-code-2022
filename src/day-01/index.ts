import { readInput, groupLines } from "../lib";

async function main() {
  const data = await readInput(__dirname);
  const lines = data.split("\n");
  const groups = groupLines(lines).map((group) => group.map(Number));
  const sums = groups.map((group) =>
    group.reduce((sum, value) => sum + value, 0)
  );
  const max = Math.max(...sums);
  console.log("Maximum calories", max);

  sums.sort((a, b) => b - a);
  console.log("Top three", sums[0] + sums[1] + sums[2]);
}

main();
