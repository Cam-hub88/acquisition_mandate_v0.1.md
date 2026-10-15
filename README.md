# Acquisition Mandate

Working documents for KII, a technology-enabled industrial group.

[`acquisition_mandate_v0.1.md`](./acquisition_mandate_v0.1.md) is the draft mandate: what KII will own, what it will refuse, and the first proof point.

[`codex.md`](./codex.md) is the operating code that draft installs. Book IV is the five-line harness. The check that applies those lines to a scenario file is [`harness/evaluate.mjs`](./harness/evaluate.mjs).

The fixture is the public mine-vehicle interaction prototype, copied so the check runs offline: [Cam-hub88/mine-vehicle-safety-ontology](https://github.com/Cam-hub88/mine-vehicle-safety-ontology). Distances and speeds in that file are illustrative.

```bash
node harness/run.mjs
node harness/run.mjs --scenario S5
node --test harness/evaluate.test.mjs
```

`node harness/run.mjs` exits 0 when every scenario passes as a reading. Add `--live` to exit 0 only when every line is a live pass. On the public fixture, S1–S5 are reading passes and live failures.
