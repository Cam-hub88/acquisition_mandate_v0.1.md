/**
 * KII Article H — five-line installation harness.
 *
 * A scenario can pass as a reading of the public prototype while still
 * failing as a live deployment. A live pass needs signed thresholds and
 * a written human accept or decline on every action.
 *
 * Illustrative distances and speeds are not site standards.
 */

const PLACE_TYPES = new Set(["RoadSegment", "Intersection", "OperatingZone"]);
const VEHICLE_TYPES = new Set(["HeavyVehicle", "LightVehicle"]);
const SENSOR_STATUS = new Set(["online", "degraded", "offline", "missing_data"]);
const ROLES = new Set([
  "light_vehicle_driver",
  "heavy_vehicle_driver",
  "supervisor",
  "control_room",
]);
const OPERATOR_ROLES = {
  haul_driver: "heavy_vehicle_driver",
  dozer_operator: "heavy_vehicle_driver",
  loader_operator: "heavy_vehicle_driver",
  light_vehicle_driver: "light_vehicle_driver",
  supervisor: "supervisor",
};
const DECIDED = new Set(["accepted", "declined", "in_progress", "completed"]);
const RANK = { R5: 5, R4: 4, R3: 3, R2: 3, R1: 1 };
const RISK = { R1: "low", R2: "medium", R3: "medium", R4: "high", R5: "critical" };

const DEFAULT_THRESHOLDS = {
  haul_corridor_speed_limit_kmh: 40,
  missing_proximity_caution_distance_metres: 50,
  critical_closing_distance_metres: 30,
};

const SOFTWARE_DECISION =
  /\b(software|system|codex|model|harness)\b[^.|\n]{0,80}\b(decided|accepted|chose|issued|approved)\b|\b(decided|accepted|approved)\b[^.|\n]{0,40}\b(software|system|codex|model|harness)\b/i;

function line(id, title, status, detail) {
  return { id, title, status, detail };
}

function participants(scenario) {
  return scenario.participants ?? [];
}

function heavy(scenario) {
  return participants(scenario).find((p) => p.type === "HeavyVehicle");
}

function light(scenario) {
  return participants(scenario).find((p) => p.type === "LightVehicle");
}

function sensorsOf(scenario) {
  return participants(scenario).flatMap((p) => p.sensors ?? []);
}

function numericThresholds(raw) {
  const out = { ...DEFAULT_THRESHOLDS };
  if (!raw || typeof raw !== "object") return out;
  for (const key of Object.keys(DEFAULT_THRESHOLDS)) {
    if (typeof raw[key] === "number") out[key] = raw[key];
  }
  return out;
}

function resolvedThresholds(scenario, datasetThresholds) {
  return numericThresholds({
    ...datasetThresholds,
    ...scenario.signed_thresholds,
  });
}

function thresholdsSigned(scenario) {
  return (
    scenario.thresholds_signed === true &&
    typeof scenario.signed_by === "string" &&
    scenario.signed_by.trim().length > 0
  );
}

function matchesR5(scenario, thresholds) {
  const hv = heavy(scenario);
  const lv = light(scenario);
  const loc = scenario.location ?? {};
  const event = scenario.interaction_event ?? {};
  const compliance = scenario.control_compliance ?? {};
  if (!hv || !lv || loc.type !== "Intersection") return false;
  if (
    typeof event.distance_metres !== "number" ||
    event.distance_metres >= thresholds.critical_closing_distance_metres
  ) {
    return false;
  }
  if (typeof event.closing_speed_kmh !== "number" || event.closing_speed_kmh <= 0) {
    return false;
  }
  if (loc.visibility !== "poor") return false;
  const types = new Set((scenario.hazards ?? []).map((h) => h.hazard_type));
  if (!types.has("dust") && !types.has("blind_spot")) return false;
  return (
    compliance.radio_acknowledgement_at_intersection === "not_complied" ||
    compliance.give_way_to_heavy_vehicle === "not_complied"
  );
}

function matchesR4(scenario) {
  const loc = scenario.location ?? {};
  const compliance = scenario.control_compliance ?? {};
  if (!heavy(scenario) || !light(scenario)) return false;
  if (loc.type !== "Intersection" || loc.acknowledgement_required !== true) return false;
  const radio = compliance.radio_acknowledgement_at_intersection;
  return radio !== "acknowledged" && radio !== "compliant";
}

function matchesR3(scenario, thresholds) {
  const hv = heavy(scenario);
  if (!hv || !light(scenario)) return false;
  const loc = scenario.location ?? {};
  if (!PLACE_TYPES.has(loc.type)) return false;
  const sensorBad = (hv.sensors ?? []).some((sensor) =>
    ["offline", "missing_data", "degraded"].includes(sensor.status),
  );
  const proximityBad =
    hv.proximity_data_status === "missing" || hv.proximity_data_status === "degraded";
  if (!sensorBad && !proximityBad) return false;
  const distance = scenario.interaction_event?.distance_metres;
  return (
    typeof distance === "number" &&
    distance <= thresholds.missing_proximity_caution_distance_metres
  );
}

function matchesR2(scenario, thresholds) {
  const lv = light(scenario);
  const loc = scenario.location ?? {};
  if (!heavy(scenario) || !lv) return false;
  if (loc.type !== "RoadSegment" || loc.road_type !== "haul_road") return false;
  const limit =
    typeof loc.design_speed_kmh === "number"
      ? loc.design_speed_kmh
      : thresholds.haul_corridor_speed_limit_kmh;
  return typeof lv.current_speed_kmh === "number" && lv.current_speed_kmh > limit;
}

function matchesR1(scenario, thresholds) {
  const hv = heavy(scenario);
  const lv = light(scenario);
  const loc = scenario.location ?? {};
  const compliance = scenario.control_compliance ?? {};
  if (!hv || !lv || loc.type !== "Intersection") return false;
  const limit =
    typeof loc.design_speed_kmh === "number"
      ? loc.design_speed_kmh
      : thresholds.haul_corridor_speed_limit_kmh;
  const speedsOk = [hv, lv].every(
    (vehicle) =>
      typeof vehicle.current_speed_kmh === "number" && vehicle.current_speed_kmh <= limit,
  );
  if (!speedsOk) return false;
  const sensors = sensorsOf(scenario);
  if (sensors.length === 0 || sensors.some((sensor) => sensor.status !== "online")) return false;
  if (compliance.radio_acknowledgement_at_intersection !== "acknowledged") return false;
  return lv.current_speed_kmh === 0 || compliance.give_way_to_heavy_vehicle === "compliant";
}

function matchingRules(scenario, thresholds) {
  const hits = [];
  if (matchesR5(scenario, thresholds)) hits.push("R5");
  if (matchesR4(scenario)) hits.push("R4");
  if (matchesR3(scenario, thresholds)) hits.push("R3");
  if (matchesR2(scenario, thresholds)) hits.push("R2");
  if (matchesR1(scenario, thresholds)) hits.push("R1");
  return hits;
}

function highestRules(hits) {
  if (hits.length === 0) return [];
  const max = Math.max(...hits.map((rule) => RANK[rule]));
  return hits.filter((rule) => RANK[rule] === max);
}

function checkObjects(scenario, controlIds) {
  const problems = [];
  const loc = scenario.location;
  if (!loc?.id || !PLACE_TYPES.has(loc.type)) {
    problems.push("place is missing or is not a Book I location");
  }

  const vehicles = participants(scenario);
  if (vehicles.length === 0) problems.push("no vehicles");
  const seen = new Set();
  for (const vehicle of vehicles) {
    if (!vehicle.id || !VEHICLE_TYPES.has(vehicle.type)) {
      problems.push("a participant is missing an id or a Book I vehicle type");
      continue;
    }
    seen.add(vehicle.id);
    if (loc?.id && vehicle.location_id !== loc.id) {
      problems.push(`${vehicle.id} is not on ${loc.id}`);
    }
    if (!vehicle.operator?.id || vehicle.operator.id !== vehicle.operator_id) {
      problems.push(`${vehicle.id} has no operator`);
    } else if (!OPERATOR_ROLES[vehicle.operator.role]) {
      problems.push(`${vehicle.operator.id} role ${vehicle.operator.role} does not map`);
    }
    if (!Array.isArray(vehicle.sensors) || vehicle.sensors.length === 0) {
      problems.push(`${vehicle.id} has no sensor`);
    } else {
      for (const sensor of vehicle.sensors) {
        if (!sensor.id || !SENSOR_STATUS.has(sensor.status)) {
          problems.push(`${vehicle.id} sensor is unnamed or has an unknown status`);
        }
      }
    }
  }

  for (const hazard of scenario.hazards ?? []) {
    if (!hazard.id || !hazard.hazard_type) problems.push("a hazard is unnamed");
  }

  const controls = scenario.safety_controls ?? [];
  if (controls.length === 0) problems.push("no safety controls");
  if (controlIds) {
    for (const id of controls) {
      if (!controlIds.has(id)) problems.push(`control ${id} is not in the catalog`);
    }
  }

  const event = scenario.interaction_event;
  if (!event?.id) {
    problems.push("no interaction event");
  } else {
    const ids = new Set(event.participant_ids ?? []);
    for (const id of seen) {
      if (!ids.has(id)) problems.push(`${id} is missing from the interaction`);
    }
    if (loc?.id && event.location_id !== loc.id) {
      problems.push("interaction location does not match the place");
    }
  }

  if (problems.length > 0) {
    return line(1, "Objects named", "fail", problems.join("; "));
  }

  const names = [
    ...vehicles.map((vehicle) => vehicle.id),
    loc.id,
    ...(scenario.hazards ?? []).map((hazard) => hazard.id),
    ...sensorsOf(scenario).map((sensor) => sensor.id),
  ];
  return line(1, "Objects named", "pass", names.join(", "));
}

function checkRule(scenario, thresholds) {
  const claimed = scenario.rule_id;
  const eventRule = scenario.interaction_event?.rule_id;
  const hits = matchingRules(scenario, thresholds);
  const highest = highestRules(hits);
  const signed = thresholdsSigned(scenario);
  const numbers = `critical ${thresholds.critical_closing_distance_metres} m, caution ${thresholds.missing_proximity_caution_distance_metres} m, haul ${thresholds.haul_corridor_speed_limit_kmh} km/h`;

  if (!claimed || !RANK[claimed]) {
    return line(2, "One rule fires", "fail", "no Book II article claimed");
  }
  if (eventRule && eventRule !== claimed) {
    return line(2, "One rule fires", "fail", `event says ${eventRule}, scenario says ${claimed}`);
  }
  if (!highest.includes(claimed)) {
    const found = highest.length > 0 ? highest.join(", ") : "none";
    return line(
      2,
      "One rule fires",
      "fail",
      `${claimed} is not the highest article whose conditions hold (highest: ${found})`,
    );
  }
  if (scenario.risk_level && scenario.risk_level !== RISK[claimed]) {
    return line(
      2,
      "One rule fires",
      "fail",
      `${claimed} expects risk ${RISK[claimed]}, scenario says ${scenario.risk_level}`,
    );
  }
  if (scenario.interaction_event?.risk_level && scenario.interaction_event.risk_level !== RISK[claimed]) {
    return line(2, "One rule fires", "fail", "interaction risk does not match the article");
  }

  const basis = signed
    ? `signed by ${scenario.signed_by.trim()} (${numbers})`
    : `illustrative and unsigned (${numbers})`;
  return line(
    2,
    "One rule fires",
    signed ? "pass" : "reading",
    `${claimed} holds on ${basis}`,
  );
}

function checkAlert(scenario) {
  const actions = scenario.recommended_actions ?? [];
  const alert = scenario.alert;
  const event = scenario.interaction_event;

  if (scenario.rule_id === "R1") {
    if (alert === null && actions.length === 0 && event?.alert_id == null) {
      return line(3, "One alert", "pass", "R1 raises no alert");
    }
    return line(3, "One alert", "fail", "R1 must not raise an alert");
  }

  if (!alert || typeof alert !== "object") {
    return line(3, "One alert", "fail", "alert is missing");
  }
  const problems = [];
  if (!alert.id) problems.push("alert has no id");
  if (!alert.message || String(alert.message).trim().length < 12) {
    problems.push("alert does not state the interaction");
  }
  if (event?.id && alert.event_id !== event.id) problems.push("alert event does not match");
  const ids = alert.recommended_action_ids ?? [];
  const actionIds = actions.map((action) => action.id);
  if (ids.length === 0 || ids.slice().sort().join() !== actionIds.slice().sort().join()) {
    problems.push("recommended actions do not match the alert");
  }
  const recipients = new Set(alert.recipient_roles ?? []);
  for (const action of actions) {
    if (!action.instruction || !String(action.instruction).trim()) {
      problems.push(`${action.id ?? "action"} has no instruction`);
    }
    if (!ROLES.has(action.assigned_role)) {
      problems.push(`${action.id ?? "action"} has no accountable role`);
    } else if (!recipients.has(action.assigned_role)) {
      problems.push(`${action.id} role is not on the alert`);
    }
    if (action.alert_id && alert.id && action.alert_id !== alert.id) {
      problems.push(`${action.id} points at a different alert`);
    }
    if (action.assigned_role && action.assigned_role !== "control_room") {
      const known = new Set(participants(scenario).map((vehicle) => vehicle.operator_id));
      if (!action.assigned_operator_id || !known.has(action.assigned_operator_id)) {
        problems.push(`${action.id} does not name the operator`);
      }
    }
  }
  if (problems.length > 0) return line(3, "One alert", "fail", problems.join("; "));

  const summary = actions
    .map((action) => `${action.action_type}→${action.assigned_role}`)
    .join(", ");
  return line(3, "One alert", "pass", `${alert.id}: ${summary}`);
}

function checkDecision(scenario) {
  const actions = scenario.recommended_actions ?? [];
  if (scenario.rule_id === "R1" && actions.length === 0) {
    return line(4, "Human decision", "pass", "not required — R1 raises no action");
  }
  if (actions.length === 0) {
    return line(4, "Human decision", "fail", "no action to accept or decline");
  }
  const open = actions.filter((action) => !DECIDED.has(action.status));
  if (open.length > 0) {
    const detail = open.map((action) => `${action.id}=${action.status ?? "missing"}`).join(", ");
    return line(4, "Human decision", "fail", detail);
  }
  const detail = actions.map((action) => `${action.id}=${action.status}`).join(", ");
  return line(4, "Human decision", "pass", detail);
}

function checkAudit(scenario) {
  const actions = scenario.recommended_actions ?? [];
  if (scenario.rule_id === "R1" && scenario.alert == null) {
    return line(5, "Audit", "pass", "not required — R1 raises no alert");
  }

  const audit = scenario.audit_record;
  if (!audit) return line(5, "Audit", "fail", "no audit record");

  const problems = [];
  if (!audit.human_decision || !String(audit.human_decision).trim()) {
    problems.push("no human decision");
  } else if (SOFTWARE_DECISION.test(audit.human_decision)) {
    problems.push("decision attributed to software");
  }
  if (!Array.isArray(audit.decided_by_role) || audit.decided_by_role.length === 0) {
    problems.push("no deciding role");
  }
  if (!audit.decided_at) problems.push("no decision time");
  if (audit.rule_id !== scenario.rule_id) problems.push("audit rule does not match");
  if (scenario.interaction_event?.id && audit.event_id !== scenario.interaction_event.id) {
    problems.push("audit event does not match");
  }
  if (scenario.alert?.id && audit.alert_id !== scenario.alert.id) {
    problems.push("audit alert does not match");
  }

  const roles = new Set(audit.decided_by_role ?? []);
  for (const action of actions) {
    if (action.assigned_role && !roles.has(action.assigned_role)) {
      problems.push(`audit omits ${action.assigned_role}`);
    }
  }
  const decidedIds = new Set(audit.decided_by_operator_ids ?? []);
  for (const action of actions) {
    if (action.assigned_operator_id && !decidedIds.has(action.assigned_operator_id)) {
      problems.push(`audit omits ${action.assigned_operator_id}`);
    }
  }

  const undecided = actions.filter((action) => !DECIDED.has(action.status));
  if (undecided.length === actions.length && actions.length > 0) {
    problems.push("audit text is present, but every action is still recommended");
  }

  if (problems.length > 0) return line(5, "Audit", "fail", problems.join("; "));
  return line(5, "Audit", "pass", `${audit.id} records the human decision`);
}

export function evaluateScenario(scenario, context = {}) {
  const thresholds = resolvedThresholds(scenario, context.thresholds);
  const lines = [
    checkObjects(scenario, context.controlIds ?? null),
    checkRule(scenario, thresholds),
    checkAlert(scenario),
    checkDecision(scenario),
    checkAudit(scenario),
  ];
  const reading =
    lines[0].status === "pass" &&
    (lines[1].status === "pass" || lines[1].status === "reading") &&
    lines[2].status === "pass";
  const live = lines.every((entry) => entry.status === "pass");
  return {
    id: scenario.id,
    title: scenario.title ?? "",
    rule_id: scenario.rule_id ?? null,
    lines,
    reading,
    live,
  };
}

export function evaluateDataset(dataset) {
  const controlIds = new Set((dataset.safety_controls_catalog ?? []).map((control) => control.id));
  const thresholds = dataset.illustrative_thresholds ?? dataset.thresholds ?? {};
  const scenarios = Array.isArray(dataset.scenarios) ? dataset.scenarios : [dataset];
  return scenarios.map((scenario) =>
    evaluateScenario(scenario, {
      thresholds,
      controlIds: controlIds.size > 0 ? controlIds : null,
    }),
  );
}

export function formatReport(results, source) {
  const blocks = [`KII harness — ${source}`];
  for (const result of results) {
    blocks.push("");
    blocks.push(`${result.id}  ${result.title}`.trimEnd());
    for (const entry of result.lines) {
      const status = entry.status.toUpperCase().padEnd(7);
      blocks.push(`  ${entry.id} ${entry.title.padEnd(16)} ${status} ${entry.detail}`);
    }
    blocks.push(`  reading: ${result.reading ? "PASS" : "FAIL"}`);
    blocks.push(`  live:    ${result.live ? "PASS" : "FAIL"}`);
  }
  return `${blocks.join("\n")}\n`;
}
