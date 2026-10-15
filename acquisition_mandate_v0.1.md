# Acquisition Mandate v0.1

**Working name:** KII  
**Status:** Draft for decision  
**Date:** 15 October 2026  
**Purpose:** Say what KII will own, what it will refuse, and the harness a deployment must pass before the group treats the [codex](./codex.md) as installed.

KII, in this document, is a working name for a technology-enabled industrial group. It is not a registered entity, a ticker, or a description of any listed company. Choices inferred for this draft are collected under [Assumptions](#assumptions). Correct those before the mandate is used on a live deal.

---

## 1. Long-term vision

KII owns a small number of operating businesses in heavy industry and improves them with one shared way of working: a plain-language model of the shift, and the people who can put that model on a real site.

The model joins the things a shift already handles — vehicles, operators, places, hazards, controls, sensors, alerts, and actions — so a supervisor can ask one question and get one answer:

> Which interaction is becoming dangerous right now, and what should we do?

Each business keeps its own profit and loss. The group earns the next acquisition by showing that the same objects and the same rule pattern move to a second site, with that site’s own names and thresholds.

The asset is owned operations plus a repeatable installation method. A model that has not recorded a live pass of the harness in [section 9](#9-first-proof-point) on a real corridor is still a document.

## 2. Initial industry focus

Start where a written vocabulary already exists, then move to the adjacent sites that use the same conflict points.

1. **Surface mining — heavy-vehicle and light-vehicle interaction.** Haul roads, intersections, loading pads, and dumps. The public prototype in [Cam-hub88/mine-vehicle-safety-ontology](https://github.com/Cam-hub88/mine-vehicle-safety-ontology) already names the objects, five scenarios (S1–S5), and plain-English IF / AND / THEN rules (R1–R5). That prototype is conceptual. It does not certify compliance, replace site procedures, or make autonomous safety decisions. This mandate restates it in the [KII codex](./codex.md) and checks it with the harness.

2. **Quarries and bulk-materials sites.** The same vehicle classes and the same conflict points, often with thinner systems and a shorter path to a first corridor.

3. **Site services inside that workflow.** Traffic management, light-vehicle fleets, radio and control-room support, and proximity-detection maintenance. These businesses already stand on the haul road. One of them can be the first owned proof point, while KII stays out of mine operation itself.

Credibility sits in the map and in a site supervisor’s right to reject a line of it. It does not sit in a claimed safety record.

## 3. Target business characteristics

KII looks for a business with these traits:

- **Commercial.** Recurring revenue from being on site. Contracts that survive a change of superintendent. A buyer who pays from an operating budget.
- **Operational.** Physical work repeated every shift, coordinated today by radio, paper, and individual memory. The failure mode is several ordinary conditions lining up — the problem the model is built to name.
- **Management.** An operator who stays, or a second-in-command who already runs the shift. The relationships that matter are written into the contract and the roster.
- **Scale.** Small enough that one deployment team can change how one corridor works within a year. Large enough that the existing site work pays for that team before any technology uplift. Planning band for the search: low-single-digit millions of annual revenue, a positive cash contribution before owner salary, and one or two anchor sites. This is a search range, not a valuation and not a fact about any company.
- **Technology posture.** The business can be non-technical. It needs access to vehicles, zones, radios, and the people who already enforce give-way and acknowledgement.

## 4. Exclusion criteria

Stop the process when any one of these is true:

- The deal requires KII to certify, automate, or override a site safety decision. The model names the interaction, the failed control, and the accountable role. People on site execute the action.
- More than half of gross profit depends on one person who is leaving, or the revenue is a verbal relationship with no contract.
- The buyer is an innovation budget with no operating owner on the shift.
- The first acquisition requires KII to become a licensed mine operator, an explosives contractor, or an autonomous-haul vendor.
- Nobody can name, in writing, the object the model would attach to within 90 days: a vehicle class, a junction type, or a control the site already treats as mandatory.
- The price works only if the business is valued as software.
- The seller wants a marketed reduction in recordable injuries that KII cannot evidence, or incident history is withheld.
- The geography or the roster cannot be supported with people on site.

## 5. Fundamental assessment

Before price talk moves past a range, write one page:

- **Revenue.** Trailing twelve months, split by contract, with renewal date and termination rights.
- **Customers.** Who signs, who uses the service on shift, and who can cancel.
- **Margins.** Gross margin after on-site labour and equipment. Owner add-backs listed separately and accepted only with evidence.
- **Cash flow.** Monthly, including the gap when a site pays on 45–60 day terms.
- **Management.** Who runs the shift when the owner is away, and what month one looks like after completion.
- **Competitive advantage.** Site access, accreditations, trained people, installed hardware, or a procedure the mine already trusts. An undeployed model is not an advantage.
- **Downside.** If the technology work stalls, the business still earns its keep as an ordinary operator. A business that only works as a product bet fails this mandate.

## 6. Technology and AI value-creation levers

Use these interventions in this order. Each one should be portable to the next site.

1. **Shared vocabulary.** Map the site’s vehicles, operators, road segments, intersections, zones, hazards, controls, and sensors onto the existing object model. Do the mapping with the people who run the shift, in language they can correct.
2. **Rules the site already believes.** Install [Book II of the codex](./codex.md#book-ii--rules): give-way, radio acknowledgement, missing proximity data, and speeding, each with an accountable role. The site sets and signs the thresholds. The demo figures in Schedule A — 40 km/h, 50 metres, under 30 metres — stay illustrative until a site validates its own.
3. **One picture when evidence conflicts.** Apply Article II.0. When proximity evidence and procedural evidence disagree, use the higher risk class and the more conservative action: hold, stop, or slow down.
4. **AI after the model is stable.** Use it to draft incident narratives, cluster repeated interactions, and propose rule changes for a person to accept. It does not issue a stop instruction, and it does not write the audit decision.
5. **Build last, if ever.** Autonomous control, automatic braking, a new sensor product, and a general mining-software platform sit outside this mandate.

## 7. People and deployment model

One deployment uses three roles:

- **Domain specialist.** Has run or supervised the interaction on site. Owns what a rule means and whether a threshold is allowed. Signs the rule before it is used.
- **Deployment engineer.** Turns the site’s names, radios, and sensor feeds into the object model, and labels each feed honestly: online, degraded, or missing.
- **AI system.** Drafts, retrieves, and checks consistency against the ontology. It owns no action.

A deployment is finished only when `node harness/run.mjs --live` reports a live pass on that corridor’s own file. KII hires the next specialist when the first site is dull and repeatable. A central product organisation waits until then.

## 8. Capital strategy

Finance the first acquisition as a small operating business. Treat the technology as improvement work inside a business that already has customers. Keep the purchase price anchored to the downside case in section 5.

Preferred sources, in order:

1. **Seller finance and an earnout** tied to contract renewal and gross profit.
2. **A modest equity cheque** from the sponsor, sized to the business with no technology uplift.
3. **Equipment finance** for vehicles and hardware the existing contracts already support.
4. **Customer-funded work** where the site is paying for a defined operational service.

Interest and repayment are serviced by the business as it operates today. Venture capital, if it is used at all, is reserved for a later product that already has sites.

## 9. First proof point

The first proof point is one corridor on one site, and a live pass of the harness on that corridor.

**Harness.** [Article H of the codex](./codex.md#article-h--harness), executed by [`harness/evaluate.mjs`](./harness/evaluate.mjs). A deployment passes when all five lines are `PASS` in the site’s own file:

1. The vehicles, the place, the hazards, the controls, the sensors, and the accountable roles are named, and each name maps to an object in the shared model.
2. One rule fires, using thresholds the site has signed.
3. One alert states the interaction, the action, and the role. The safe-interaction rule raises no alert, and that is a pass.
4. A person on site accepts or declines each action. A status of `recommended` fails.
5. An audit line records that human decision and agrees with the action statuses. The record does not credit the software with the decision.

**Preferred path.** A paid working session with one surface mine or quarry. Map one haul corridor and one intersection. Run scenarios S1–S5 from the prototype against that site’s real procedure. Leave a written rule set the supervisor can accept or reject line by line, then re-run the harness with `thresholds_signed` and the supervisor’s name.

**Alternate path.** If a small site-services business inside this workflow is for sale and passes sections 3 to 5, buy it and run the same harness on its own work within 90 days.

Success is a corrected model, a list of the data the site already collects, and a live harness pass. A claimed reduction in incidents is not the success test.

### Harness demo on the public prototype

Command:

```bash
node harness/run.mjs --scenario S5
```

The fixture is [`harness/fixtures/sample_interactions.json`](./harness/fixtures/sample_interactions.json), copied from the public prototype. Distances and speeds below are that file’s illustrative figures. They are not site standards.

At 15:22:47 the sample evidence is: loaded Haul Truck 12 (HV-HT-12, operator OP-101) at 38 km/h and Light Vehicle 7 (LV-07, operator OP-214) at 26 km/h, both at Blind Spot Junction, 28 m apart, closing at 48 km/h, visibility poor (dust and a blind spot), radio acknowledgement and give-way both `not_complied`, proximity sensors online.

Result of the harness on that file:

| Line | S5 result | Why |
|---|---|---|
| 1. Objects named | PASS | HV-HT-12, LV-07, IX-BLIND-01, HZ-DUST-01, HZ-BLIND-01, SN-HV-12-P, SN-LV-07-U |
| 2. One rule fires | READING | R5’s conditions hold. The 30 m, 50 m, and 40 km/h figures are unsigned |
| 3. One alert | PASS | AL-2005 recommends stop for the light-vehicle driver, slow-down for the haul driver, and a radio call for the control room |
| 4. Human decision | FAIL | OA-3005A, OA-3005B, and OA-3005C are still `recommended` |
| 5. Audit | FAIL | AUD-9005 says the recommendations were accepted, and the action records do not |

**Reading: PASS. Live: FAIL.**

The same command on the whole fixture gives the same shape for S1–S4: each rule matches its scenario, and none is a live pass. S1 fails live only because the speed limit is unsigned. S2–S4 also have actions still `recommended` and no audit record. S5 is the sharp case, because the audit text and the action statuses disagree.

A live pass of this same S5 shape needs three edits a supervisor makes, not the software: `thresholds_signed: true`, a `signed_by` name, and each action moved from `recommended` to `accepted` or `declined`. The tests in [`harness/evaluate.test.mjs`](./harness/evaluate.test.mjs) cover that pass, a missing role, and an audit that credits the software.

Full narrative walkthrough of the sample, separate from this check: [demo/demo_scenario.md](https://github.com/Cam-hub88/mine-vehicle-safety-ontology/blob/main/demo/demo_scenario.md).

## 10. Five-year outcome

Five years out, all of the following are true:

- KII owns more than one operating business, and each can still be read as its own profit and loss.
- At least two sites use the same object model and the same rule pattern, with different signed thresholds.
- A person who was not on the first deployment can install the model on a new site with a domain specialist, and `node harness/run.mjs --live` passes on that site’s file.
- No business in the group depends on a claim that software prevented an injury.
- A deal can be refused with the list in section 4 without opening a new strategy discussion.
- The next business can still be financed from the sources in section 8, without venture funding of the whole group.

If those statements are false, KII is a single services company with a document, and this mandate has not been met.

---

## Assumptions

Correct these before the mandate is used on a live deal.

- **Name.** “KII” is the working name for this draft. It names no registered entity and no listed issuer.
- **Sector.** The industry focus is taken from the public repository [Cam-hub88/mine-vehicle-safety-ontology](https://github.com/Cam-hub88/mine-vehicle-safety-ontology). If that prototype is a side exercise, rewrite section 2 before using the rest.
- **Scale.** The revenue band in section 3 is a planning range for a search. It is not a valuation and not a description of any company.
- **Thresholds.** 40 km/h, 50 metres, and under 30 metres are the prototype’s illustrative figures. A live harness uses numbers a site supervisor has signed.
- **Targets.** This draft names no seller, no site, and no financing commitment.
