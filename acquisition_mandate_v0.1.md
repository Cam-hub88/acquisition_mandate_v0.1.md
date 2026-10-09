# Acquisition Mandate v0.1

**Working name:** KII
**Status:** Draft for decision
**Date:** 9 October 2026

KII is the working name of the group this mandate describes. No legal entity, ticker, or acronym expansion is assumed. Where a choice below is inferred rather than decided, it is listed under [Assumptions](#assumptions).

---

## 1. Long-term vision

KII is a technology-enabled industrial group. It owns a small number of operating businesses in heavy industry and improves them with one shared operating system: a plain-language model of the work, and the people who can install that model on a real site.

The model connects the things a shift already deals with — vehicles, operators, places, hazards, controls, sensors, alerts, and actions — so a supervisor can ask one question and get one answer:

> Which interaction is becoming dangerous right now, and what should we do?

Each business keeps its own profit and loss. The group earns the right to own the next one by showing that the same objects and the same rule pattern move to a second site, with that site’s own thresholds and names.

The asset is owned operations plus a repeatable way to make those operations safer and more predictable. Software that has not been installed on a shift is not yet an asset.

## 2. Initial industry focus

Start where a written vocabulary already exists.

1. **Surface mining — heavy-vehicle and light-vehicle interaction.** Haul roads, intersections, loading pads, and dumps. This is the domain of the public prototype in [Cam-hub88/mine-vehicle-safety-ontology](https://github.com/Cam-hub88/mine-vehicle-safety-ontology): an ontology, five scenarios, and plain-English IF / AND / THEN rules. That prototype is conceptual. It does not certify compliance, replace site procedures, or make autonomous safety decisions. This mandate uses it as the starting map.

2. **Quarries and bulk-materials sites.** The same vehicle classes and the same conflict points, often with thinner systems and a shorter path to a first corridor.

3. **Site services inside that workflow.** Traffic management, light-vehicle fleets, radio and control-room support, and proximity-detection maintenance. These businesses already stand on the haul road. One of them can be the first owned proof point without KII becoming a mine operator.

Credibility sits in the map and in the willingness to have a site supervisor reject it. It does not sit in a claimed safety record.

## 3. Target business characteristics

KII looks for a business with these traits:

- **Commercial.** Recurring revenue from being on site. Contracts that survive a change of superintendent. A buyer who pays from an operating budget.
- **Operational.** Physical work repeated every shift, coordinated today by radio, paper, and individual memory. The failure mode is fragmented information — several ordinary conditions lining up — which is the problem the model is built to name.
- **Management.** An operator who stays, or a second-in-command who already runs the shift. Relationships that matter are written into the contract and the roster, so they survive the sale.
- **Scale.** Small enough that one deployment team can change how one corridor works within a year. Large enough that the existing site work pays for that team before any technology uplift. Planning band for the search: low-single-digit millions of annual revenue, with a positive cash contribution before owner salary, and one or two anchor sites. This is a search range, not a valuation and not a fact about any company.
- **Technology posture.** The business can be non-technical. It needs access to vehicles, zones, radios, and the people who already enforce give-way and acknowledgement rules.

## 4. Exclusion criteria

KII rejects a business when any of the following is true:

- The deal requires KII to certify, automate, or override site safety decisions. The model names the interaction, the failed control, and the accountable role. People on site execute the action.
- More than half of gross profit depends on one person who is leaving, or the revenue is a verbal relationship with no contract.
- The buyer is an innovation budget with no operating owner on the shift.
- The first acquisition requires KII to become a licensed mine operator, an explosives contractor, or an autonomous-haul vendor.
- Nobody can name, in writing, the operational object the model would attach to within 90 days: a vehicle class, a junction type, or a control the site already treats as mandatory.
- The price only works if the business is valued as software.
- The seller wants a marketed reduction in recordable injuries that KII cannot evidence, or incident history is being withheld.
- The geography or the roster cannot be supported with people on site.

## 5. Fundamental assessment

Before price talk moves past a range, write one page:

- **Revenue.** Trailing twelve months, split by contract, with renewal date and termination rights.
- **Customers.** Who signs, who uses the service on shift, and who can cancel.
- **Margins.** Gross margin after on-site labour and equipment. Owner add-backs listed separately and accepted only with evidence.
- **Cash flow.** Monthly, including the gap when a site pays on 45–60 day terms.
- **Management.** Who runs the shift when the owner is away, and what month one looks like after completion.
- **Competitive advantage.** Site access, accreditations, trained people, installed hardware, or a procedure the mine already trusts. Undeployed software is not an advantage.
- **Downside.** If the technology work stalls, the business still earns its keep as an ordinary operator. A business that only works as a product bet fails this mandate.

## 6. Technology and AI value-creation levers

Use these interventions in this order. Each one should be portable to the next site.

1. **Shared vocabulary.** Map the site’s vehicles, operators, road segments, intersections, zones, hazards, controls, and sensors onto the existing object model. Do the mapping with the people who run the shift, in language they can correct.
2. **Rules the site already believes.** Encode give-way, radio acknowledgement, missing proximity data, and speeding as IF / AND / THEN rules with an accountable role. Thresholds are set and signed by the site. The demo figures in the prototype — 40 km/h, 50 metres, under 30 metres — stay illustrative until a site validates its own.
3. **One picture.** When proximity evidence and procedural evidence disagree, use the higher risk class and the more conservative action: hold, stop, or slow down. That principle is already written in the prototype.
4. **AI after the model is stable.** Use it to draft incident narratives, cluster repeated interactions, and propose rule changes for a person to accept. It does not issue a stop instruction.
5. **Build last, if ever.** Autonomous control, automatic braking, a new sensor, and a general mining-software platform are outside this mandate.

## 7. People and deployment model

One deployment uses three roles:

- **Domain specialist.** Has run or supervised the interaction on site. Owns what a rule means and whether a threshold is allowed. Signs the rule before it is used.
- **Deployment engineer.** Turns the site’s names, radios, and sensor feeds into the object model, and keeps each feed labelled honestly: online, degraded, or missing.
- **AI system.** Drafts, retrieves, and checks consistency against the ontology. It owns no action.

A deployment is finished when a supervisor can ask which interaction is becoming dangerous and what to do, and the answer names the vehicles, the place, the failed control, the accountable role, and the action — and a person on site agrees that the answer matches the procedure.

KII staffs the next specialist when the first site is dull and repeatable. A central product organisation waits until then.

## 8. Capital strategy

Finance the first acquisition as a small operating business. Treat the technology as improvement work inside a business that already has customers. Keep the purchase price anchored to the downside case in section 5.

Preferred sources, in order:

1. **Seller finance and an earnout** tied to contract renewal and gross profit.
2. **A modest equity cheque** from the sponsor, sized to the business with no technology uplift.
3. **Equipment finance** for vehicles and hardware the existing contracts already support.
4. **Customer-funded work** only where the site is paying for a defined operational service.

Interest and repayment are serviced by the business as it operates today. Venture capital is reserved, if ever used, for a later product that already has sites — it is not the plan for the first acquisition.

## 9. First proof point

The first proof point is one corridor on one site.

Preferred path: a paid working session with one surface mine or quarry. Map one haul corridor and one intersection. Walk the five interaction patterns from the prototype against that site’s real procedure. Leave a written rule set the supervisor can accept or reject line by line.

Alternate path: if a small site-services business inside this workflow is for sale and passes sections 3 to 5, buy it and run the same exercise on its own work within 90 days.

The public ontology is the starting file. Success is a site supervisor correcting the model, a list of the data the site already collects, and rules accepted or rejected in writing. A claimed reduction in incidents is not the success test.

## 10. Five-year outcome

Five years out, all of the following are true:

- KII owns more than one operating business, and each can still be read as its own profit and loss.
- At least two sites use the same object model and the same rule pattern, with different thresholds.
- A person who was not on the first deployment can install the model on a new site with a domain specialist, without rewriting the vocabulary.
- No business in the group depends on a claim that software prevented an injury.
- A deal can be rejected with the exclusion list in section 4 without opening a new strategy discussion.
- The next business can still be financed without venture funding of the whole group.

If those statements are false, KII is a single services company with a document, and this mandate has not been met.

---

## Assumptions

Correct these before the mandate is used on a live deal.

- **Name.** “KII” is the working name supplied for this draft. It is not a registered entity in this document.
- **Sector.** The industry focus is inferred from the public repository [Cam-hub88/mine-vehicle-safety-ontology](https://github.com/Cam-hub88/mine-vehicle-safety-ontology). If that prototype is a side exercise, rewrite section 2 before using the rest.
- **Scale.** The revenue band in section 3 is a planning range for a search. It is not a valuation and not a description of any company.
- **Targets.** This draft names no seller, no site, and no financing commitment.
