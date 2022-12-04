import * as fs from "fs/promises";
import * as path from "path";

export async function readInput(
  directory: string,
  filename = "input.txt"
): Promise<string> {
  const input = await fs.readFile(path.join(directory, filename), "utf-8");
  return input.trim();
}

export function groupLines<T>(lines: T[]) {
  let group: T[] = [];
  const groups: T[][] = [group];
  for (const line of lines) {
    if (line === "") {
      if (group.length === 0) {
        continue;
      }
      group = [];
      groups.push(group);
      continue;
    }
    group.push(line);
  }
  return groups;
}

export function checkExists<T>(x: T | null | undefined): T {
  if (x == null) {
    throw new Error(`checkExists failed`);
  }
  return x;
}
