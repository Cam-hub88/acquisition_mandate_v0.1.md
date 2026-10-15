import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluateDataset, formatReport } from "./evaluate.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const defaultFile = resolve(here, "fixtures/sample_interactions.json");

function parseArgs(argv) {
  const args = { file: defaultFile, scenario: null, live: false };
  const rest = [];
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--live") args.live = true;
    else if (token === "--scenario") {
      args.scenario = argv[i + 1];
      i += 1;
    } else if (token.startsWith("--")) {
      throw new Error(`Unknown option ${token}`);
    } else rest.push(token);
  }
  if (rest[0]) args.file = resolve(rest[0]);
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const dataset = JSON.parse(readFileSync(args.file, "utf8"));
  let results = evaluateDataset(dataset);
  if (args.scenario) {
    results = results.filter((result) => result.id === args.scenario);
    if (results.length === 0) {
      console.error(`No scenario ${args.scenario} in ${args.file}`);
      process.exit(2);
    }
  }
  process.stdout.write(formatReport(results, args.file));
  const ok = args.live ? results.every((result) => result.live) : results.every((result) => result.reading);
  process.exit(ok ? 0 : 1);
}

main();
