# KII Codex v0.1

**Status:** Draft operating code  
**Date:** 15 October 2026  
**Governs:** How a KII deployment names an interaction, classifies it, and records the human decision  
**Check:** [`harness/evaluate.mjs`](./harness/evaluate.mjs) applies Book IV to a scenario file  
**Source:** [Cam-hub88/mine-vehicle-safety-ontology](https://github.com/Cam-hub88/mine-vehicle-safety-ontology), ontology v1.2, rules R1–R5, scenarios S1–S5

This codex is the code the [acquisition mandate](./acquisition_mandate_v0.1.md) installs. It is a conceptual prototype. It does not certify compliance, replace a site procedure, or authorise an autonomous stop. Numeric limits in [Schedule A](#schedule-a--illustrative-thresholds) stay illustrative until a domain specialist signs site values in their place.

A deployment is finished only when [Article H](#article-h--harness) is a live pass on a real corridor. A reading of the sample file is not that pass.

---

## How to read this code

- **Book I** names the objects. A site word that cannot be mapped to one of these objects is out of scope for this version.
- **Book II** is the rule that fires. One interaction takes the highest article whose conditions are all true.
- **Book III** says who decides. The codex recommends. A person accepts or declines.
- **Book IV** is the test that the installation matches this code.

---

## Book I — Objects

| Article | Object | What it is on a shift | The link that matters |
|---|---|---|---|
| I.1 | Operator | A person authorised to drive or supervise | `operates` a vehicle; `assigned` an action |
| I.2 | HeavyVehicle | Haul truck, dozer, loader, or grader | `has_priority_over` a light vehicle; `proximity_data_status` is available, missing, or degraded |
| I.3 | LightVehicle | Pickup, service ute, or supervisor vehicle | `must_give_way_to` a heavy vehicle |
| I.4 | RoadSegment | Haul road, access road, or ramp between junctions | `design_speed_kmh` is the limit Article II.2 tests |
| I.5 | Intersection | A junction where paths can conflict | `acknowledgement_required` is the switch for Article II.4 |
| I.6 | OperatingZone | Loading, dump, haul, workshop, or restricted area | Contains the segments and intersections inside it |
| I.7 | Sensor | Proximity radar, UWB, lidar, GPS, or a fixed beacon | `status` is online, degraded, offline, or missing_data |
| I.8 | Hazard | Dust, blind spot, congestion, poor lighting, weather, slope, or sensor loss | `presents_at` a place |
| I.9 | SafetyControl | Give-way, speed limit, radio call, acknowledgement, hold, or immediate stop | `applies_to` a place or a vehicle class; `mandatory` is true or false |
| I.10 | InteractionEvent | Two or more vehicles coming together | `occurs_at` a place; carries distance, closing speed, and `rule_id` |
| I.11 | Alert | The notice that an event needs attention | Must recommend at least one action |
| I.12 | OperationalAction | The step a role is asked to take | `assigned_role` is required; `assigned_operator_id` is filled when the person is known |
| I.13 | AuditRecord | What was seen, which article fired, what was recommended, what the person decided | Records the human decision, not a decision by the codex |

Parent type `Vehicle` covers I.2 and I.3. Job titles map to accountable roles as follows: haul driver, dozer operator, and loader operator map to `heavy_vehicle_driver`; `light_vehicle_driver` and `supervisor` keep those names. `control_room` is a role with no single operator id.

Full properties and relationship names: [`ontology/vehicle_safety_ontology.yaml`](https://github.com/Cam-hub88/mine-vehicle-safety-ontology/blob/main/ontology/vehicle_safety_ontology.yaml).

---

## Book II — Rules

Apply Article II.0 when evidence conflicts. Then apply the single highest article among II.1–II.5 whose conditions are all true. Rank, low to high: II.1, then II.2 and II.3 together, then II.4, then II.5. The harness uses that rank. If II.2 and II.3 are both true and nothing higher is true, either may be the claimed article.

### Article II.0 — Conflicting evidence

**IF** proximity evidence and procedural evidence disagree  
**AND** either source indicates elevated risk  

**THEN** use the higher risk class, and the more conservative action: `hold_position`, `stop`, or `slow_down`.  
**Accountable role:** `control_room` confirms. Vehicle operators execute.

### Article II.1 — Normal safe interaction

Maps to prototype rule R1 and scenario S1.

**IF** a heavy vehicle and a light vehicle are approaching the same intersection  
**AND** both speeds are within the applicable limit  
**AND** related sensors are `online`  
**AND** radio acknowledgement at the intersection is `acknowledged`  
**AND** the light vehicle is holding or giving way  

**THEN** risk is `low`. Continue monitoring. Raise no alert.  
**Accountable role:** `control_room` monitors. `light_vehicle_driver` keeps the give-way.

### Article II.2 — Speeding light vehicle

Maps to prototype rule R2 and scenario S2.

**IF** a light vehicle is on a haul road segment  
**AND** its speed exceeds that segment’s `design_speed_kmh`  
**AND** a heavy vehicle is ahead on the same segment  

**THEN** risk is `medium`. Action is `slow_down`. The light vehicle does not overtake without clearance.  
**Accountable role:** `light_vehicle_driver`. `supervisor` if the breach is repeated.  
**Illustrative limit:** 40 km/h on the haul corridor. See Schedule A.

### Article II.3 — Heavy vehicle missing proximity data

Maps to prototype rule R3 and scenario S3.

**IF** a heavy vehicle is near another vehicle or inside an operating zone  
**AND** its proximity data is `missing` or `degraded`, or a relevant sensor is `offline` or `missing_data`  
**AND** separation is within the caution distance  

**THEN** risk is `medium`.  
**Actions:** light vehicle `hold_position`; heavy-vehicle driver `radio_call` to confirm awareness; `control_room` `investigate_sensor`.  
**Illustrative caution distance:** 50 metres. See Schedule A.

### Article II.4 — Unacknowledged intersection

Maps to prototype rule R4 and scenario S4.

**IF** a light vehicle is approaching an intersection where acknowledgement is required  
**AND** a heavy vehicle is approaching or occupying that intersection  
**AND** radio acknowledgement is not completed  

**THEN** risk is `high`.  
**Actions:** light vehicle `hold_position`; heavy-vehicle driver or `control_room` `acknowledge` before the light vehicle proceeds.  
**Window:** site-defined. The prototype treats the window as already timed out when the field is anything other than `acknowledged`.

### Article II.5 — Immediate intervention

Maps to prototype rule R5 and scenario S5.

**IF** a heavy vehicle and a light vehicle are closing at the same intersection  
**AND** separation is under the critical closing distance, with a closing speed above zero  
**AND** visibility is `poor` because of dust, a blind spot, or both  
**AND** mandatory radio acknowledgement or give-way is `not_complied`  

**THEN** risk is `critical`.  
**Actions:** light vehicle `stop`; heavy vehicle `slow_down` and prepare to hold; `control_room` broadcasts a `radio_call` and confirms receipt until separation is restored.  
**Accountable roles:** `light_vehicle_driver`, `heavy_vehicle_driver`, `control_room`.  
**Illustrative critical distance:** under 30 metres. See Schedule A.

Worked result of II.5 against the sample file: [Harness demo](./acquisition_mandate_v0.1.md#harness-demo-on-the-public-prototype).

---

## Book III — Accountability

### Article III.1 — An alert carries an action

Every alert names at least one operational action. Every action names an `assigned_role`: `light_vehicle_driver`, `heavy_vehicle_driver`, `supervisor`, or `control_room`. A driver action also names `assigned_operator_id`. `control_room` may stay role-only.

### Article III.2 — The person decides

Allowed action states are `recommended`, `accepted`, `in_progress`, `completed`, and `declined`. A human decision is `accepted`, `declined`, `in_progress`, or `completed`. `recommended` means nobody has decided. The codex does not set `accepted` by itself.

### Article III.3 — The audit records the person

An audit record names the event, the alert, the article (`rule_id`), the human decision, the deciding role, the deciding operator when there is one, and the time. The decision text must name a person or a role. Text that credits the software, the codex, or the harness with the decision fails Article H. Follow-up is optional and is a site action, such as coaching or a dust check.

---

## Book IV — Installation test

### Article H — Harness

Run it with:

```bash
node harness/run.mjs --scenario S5
```

A corridor is a **live pass** only when all five lines are `PASS`:

1. The vehicles, the place, the hazards, the controls, the sensors, and the accountable roles are named, and each name maps to a Book I object.
2. One Book II article fires, using thresholds a domain specialist has signed (`thresholds_signed: true` and a non-empty `signed_by`).
3. One alert states the interaction, the action, and the role. Rule R1 is the exception: it passes this line only when it raises no alert.
4. A person on site accepts or declines each action. `recommended` fails.
5. An audit record stores that human decision, and the action statuses agree with it. An audit that claims acceptance while every action is still `recommended` fails. An audit that credits the software fails.

`READING` on line 2 means the article’s conditions hold on the illustrative numbers, and nobody has signed them. A reading pass requires lines 1 and 3 to be `PASS` and line 2 to be `PASS` or `READING`. Lines 4 and 5 do not block a reading. They do block a live pass.

The harness fails a live deployment when any line is missing: an unnamed vehicle, an unsigned threshold, an alert with no role, a recommendation with no human decision, or an audit line that credits the software with the action.

---

## Schedule A — Illustrative thresholds

These figures come from the prototype. They are not site standards. A live installation replaces each row with a signed value before Article H line 2 can pass.

| Item | Prototype figure | Used by |
|---|---|---|
| Haul corridor speed limit | 40 km/h | Article II.2 |
| Caution distance when proximity data is missing | 50 metres | Article II.3 |
| Critical closing distance | under 30 metres | Article II.5 |
| Radio acknowledgement window | Site-defined; treated as timed out unless the field is `acknowledged` | Article II.4 |

---

## Source files

| This codex | Prototype file |
|---|---|
| Book I | [`ontology/vehicle_safety_ontology.yaml`](https://github.com/Cam-hub88/mine-vehicle-safety-ontology/blob/main/ontology/vehicle_safety_ontology.yaml) |
| Book II | [`rules/interaction_rules.md`](https://github.com/Cam-hub88/mine-vehicle-safety-ontology/blob/main/rules/interaction_rules.md) |
| Sample events | [`harness/fixtures/sample_interactions.json`](./harness/fixtures/sample_interactions.json), copied from [`data/sample_interactions.json`](https://github.com/Cam-hub88/mine-vehicle-safety-ontology/blob/main/data/sample_interactions.json) |
| Article II.5 walkthrough | [`demo/demo_scenario.md`](https://github.com/Cam-hub88/mine-vehicle-safety-ontology/blob/main/demo/demo_scenario.md) |
| Article H check | [`harness/evaluate.mjs`](./harness/evaluate.mjs) |
