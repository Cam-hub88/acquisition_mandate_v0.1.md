import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { evaluateDataset, evaluateScenario } from "./evaluate.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const samplePath = resolve(here, "fixtures/sample_interactions.json");
const sample = JSON.parse(readFileSync(samplePath, "utf8"));

function byId(id) {
  return evaluateDataset(sample).find((result) => result.id === id);
}

function scenario(id) {
  return structuredClone(sample.scenarios.find((item) => item.id === id));
}

test("prototype S1–S5 pass as a reading and fail as a live deployment", () => {
  const results = evaluateDataset(sample);
  assert.deepEqual(
    results.map((result) => result.id),
    ["S1", "S2", "S3", "S4", "S5"],
  );
  for (const result of results) {
    assert.equal(result.reading, true, `${result.id} reading`);
    assert.equal(result.live, false, `${result.id} live`);
  }
});

test("S5 fails live on unsigned thresholds and recommended actions", () => {
  const result = byId("S5");
  assert.equal(result.lines[0].status, "pass");
  assert.equal(result.lines[1].status, "reading");
  assert.match(result.lines[1].detail, /R5/);
  assert.match(result.lines[1].detail, /unsigned/);
  assert.equal(result.lines[2].status, "pass");
  assert.match(result.lines[2].detail, /AL-2005/);
  assert.equal(result.lines[3].status, "fail");
  assert.match(result.lines[3].detail, /OA-3005A=recommended/);
  assert.equal(result.lines[4].status, "fail");
  assert.match(result.lines[4].detail, /still recommended/);
});

test("a signed S5 with accepted actions is a live pass", () => {
  const live = scenario("S5");
  live.thresholds_signed = true;
  live.signed_by = "A. Supervisor";
  for (const action of live.recommended_actions) action.status = "accepted";
  const result = evaluateScenario(live, {
    thresholds: sample.illustrative_thresholds,
    controlIds: new Set(sample.safety_controls_catalog.map((control) => control.id)),
  });
  assert.equal(result.live, true, result.lines.map((entry) => entry.detail).join(" | "));
  assert.equal(result.lines[1].status, "pass");
});

test("an audit that credits the software fails line 5", () => {
  const credited = scenario("S5");
  credited.thresholds_signed = true;
  credited.signed_by = "A. Supervisor";
  for (const action of credited.recommended_actions) action.status = "accepted";
  credited.audit_record.human_decision = "The system decided to stop both vehicles";
  const result = evaluateScenario(credited, {
    thresholds: sample.illustrative_thresholds,
  });
  assert.equal(result.lines[4].status, "fail");
  assert.match(result.lines[4].detail, /software/);
  assert.equal(result.live, false);
});

test("an alert action with no role fails line 3", () => {
  const broken = scenario("S5");
  broken.recommended_actions[0].assigned_role = "";
  const result = evaluateScenario(broken, {
    thresholds: sample.illustrative_thresholds,
  });
  assert.equal(result.lines[2].status, "fail");
  assert.match(result.lines[2].detail, /accountable role/);
});

test("the CLI reports S5 as a reading pass and a live fail", () => {
  const output = execFileSync(process.execPath, ["harness/run.mjs", "--scenario", "S5"], {
    cwd: resolve(here, ".."),
    encoding: "utf8",
  });
  assert.match(output, /1 Objects named\s+PASS/);
  assert.match(output, /2 One rule fires\s+READING/);
  assert.match(output, /reading: PASS/);
  assert.match(output, /live:\s+FAIL/);
});
