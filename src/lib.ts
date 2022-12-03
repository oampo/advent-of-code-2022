import * as fs from "fs/promises";
import * as path from "path";

export function readInput(
  directory: string,
  filename = "input.txt"
): Promise<string> {
  return fs.readFile(path.join(directory, filename), "utf-8");
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
