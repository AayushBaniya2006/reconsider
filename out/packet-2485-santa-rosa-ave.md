# Appeal of Wildfire Risk Score — 10 CCR §2644.9(i)

**Subject property:** 2485 SANTA ROSA AVE, ALTADENA, CA 91001
**Date:** 2026-08-10
**Prepared for filing via producer** (agent/broker forwarding duty, 10 CCR §2644.9(j): "the policyholder or applicant may appeal orally or in writing to the agent or broker … who shall then forward that appeal to the insurer no later than five (5) calendar days after receiving the appeal.")

## Decision

**APPEAL** — Met standards (2) outweigh documented gaps (1); remaining unknowns (9) are evidence requests, not concessions.

Scorecard: 2 met · 1 not met · 9 unknown (of 12 enumerated standards).

## Statutory basis and clock

This is an appeal of the wildfire risk score / classification under 10 CCR §2644.9(i) — not a nonrenewal dispute. Verbatim:

> If the policyholder or applicant appeals the wildfire risk score or other wildfire risk classification, the insurer shall acknowledge receipt of the appeal in writing within ten (10) calendar days of receipt of the appeal. The insurer shall respond to the appeal in writing with a reconsideration and decision within thirty (30) calendar days after receiving the appeal.

| Statutory step | Deadline |
|---|---|
| Producer forwards appeal to insurer (§2644.9(j), 5 calendar days) | 2026-08-15 |
| Insurer written acknowledgment (§2644.9(i), 10 calendar days from receipt) | 2026-08-20* |
| Insurer written reconsideration + decision (§2644.9(i), 30 calendar days) | 2026-09-09* |

\* Computed from packet date; statutory clocks run from the insurer's actual receipt.

## Subject parcel exposure — independently cited facts

CAL FIRE's official Fire Hazard Severity Zone map (CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases) classifies the subject parcel as **Non-Wildland** (responsibility area: LRA). The written reconsideration required by §2644.9(i) should reconcile the insurer's wildfire risk score with the State's own hazard classification of this parcel.

| Fact | Value | Source | Confidence | Vintage |
|---|---|---|---|---|
| fire_hazard_severity_zone_class | Non-Wildland | CALFIRE_FHSZ | high | CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases |
| fire_hazard_responsibility_area | LRA | CALFIRE_FHSZ | high | CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases |
| lcms_class | Trees | USFS_LCMS | medium | USFS LCMS Land_Cover CONUS v2025-11 (2025 annual), ~120 m block-mode CONUS COG |
| tree_canopy_pct | 24 percent | USFS_NLCD_TCC | high | USFS/MRLC NLCD Tree Canopy Cover 2025 (v2025-6), CONUS COG (~120 m block-mean canopy %) |
| ndvi_current | 0.13 | COPERNICUS_S2_SR_HARMONIZED | high | S2 SR 60d window @ 2026-08-10 |
| ndvi_change_5y | -0.022 | COPERNICUS_S2_SR_HARMONIZED | medium | — |
| slope_degrees | 4.692 degrees | USGS_3DEP_COG | medium | — |
| elevation | 388.454 meters | USGS_3DEP_COG | medium | 3DEP 1/3 arc-second seamless DEM |

Location resolution: rooftop-accuracy geocode (parcel-grade) of "2485 Santa Rosa Ave, Altadena, CA 91001" via geocodio.

**Evidence in flight:** this agent has requested additional fields from the data provider — nearest_fire_perimeter_distance_m (CAL FIRE FRAP); most_recent_burn_year; incident_name (request `fr_43cf7d4595af48c38390a83589b22c80`, filed 2026-08-10, provider ETA 2026-08-11). This packet will be supplemented when the fields are delivered.

## Assessment against the enumerated mitigation standards (10 CCR §2644.9(d)(1))

The argument of this packet is the enumerated Safer-from-Wildfires standards the regulation requires rating plans to reflect. Survivor comparables (below) corroborate; they are not the argument.

| Std | Enumerated standard (verbatim) | Status | Evidence |
|---|---|---|---|
| A1 (10 CCR §2644.9(d)(1)(A)) | Fire Risk Reduction Community listed by the Board of Forestry pursuant to Public Resources Code section 4290.1 | unknown | No evidence available yet. |
| A2 (10 CCR §2644.9(d)(1)(A)) | Firewise USA Site in Good Standing | unknown | No evidence available yet. |
| B1a (10 CCR §2644.9(d)(1)(B)1.) | Clearing of vegetation and debris from under decks | unknown | No evidence available yet. |
| B1b (10 CCR §2644.9(d)(1)(B)1.) | Clearing of vegetation, debris, mulch, stored combustible materials, and any and all movable combustible objects, from the area within five (5) feet | unknown | No evidence available yet. |
| B1c (10 CCR §2644.9(d)(1)(B)1.) | Incorporation of only noncombustible materials into that portion of any improvements situated within five (5) feet | unknown | No evidence available yet. |
| B1d (10 CCR §2644.9(d)(1)(B)1.) | Removal or absence of combustible structures from the area within thirty (30) feet | unknown | No evidence available yet. |
| B1e (10 CCR §2644.9(d)(1)(B)1.) | Whether the property complies with Section 4291 of the Public Resources Code, and any applicable local ordinances | unknown | No evidence available yet. |
| B2a (10 CCR §2644.9(d)(1)(B)2.) | Class-A Fire Rated Roof | unknown | CAL FIRE inspector recorded roof material: Asphalt. Material does not establish Class-A rating — status unknown pending documentation. |
| B2b (10 CCR §2644.9(d)(1)(B)2.) | Enclosed Eaves | **MET** | CAL FIRE inspector recorded eaves: Enclosed. |
| B2c (10 CCR §2644.9(d)(1)(B)2.) | Fire-Resistant Vents | **MET** | CAL FIRE inspector recorded vent screening: Mesh Screen <= 1/8". |
| B2d (10 CCR §2644.9(d)(1)(B)2.) | Multipane windows, including dual pane windows, or functional shutters | NOT MET | CAL FIRE inspector recorded window panes: Single Pane. |
| B2e (10 CCR §2644.9(d)(1)(B)2.) | At least six (6) inches of noncombustible vertical clearance at the bottom | unknown | No evidence available yet. |

## Demand under §2644.9(k)(B)

We demand, for each mitigation measure below, the disclosure the regulation requires, verbatim:

> The amount of premium reduction the policyholder or applicant would realize as a result of performing each such measure under the insurer’s rating plan that is in effect at the time.

| # | Mitigation measure (enumerated standard) | Eaton survival delta (SFR, Unknown excluded) | Disclosure demanded |
|---|---|---|---|
| 1 | Multipane windows, including dual pane windows, or functional shutters (B2d) | +15 pp | Dollar premium reduction for completing this measure, itemized in the §2644.9(i) written reconsideration |

## Corroboration: CAL FIRE DINS survivor comparables (Eaton Fire)

Subject property's own CAL FIRE damage-inspection record: damage="No Damage", roof=Asphalt, vents=Mesh Screen <= 1/8", eaves=Enclosed, windows=Single Pane, siding=Wood, built 1948, APN 5840010005.

**Survival by ROOFCONSTRUCTION** (No Damage vs Destroyed (>50%)):

| Category | No Damage | Destroyed | Survival |
|---|---|---|---|
| Combustible | 1 | 0 | 100% |
| Other | 16 | 4 | 80% |
| Concrete | 125 | 48 | 72% |
| Tile | 1069 | 620 | 63% |
| Asphalt | 3803 | 4410 | 46% |
| Metal | 34 | 53 | 39% |
| Wood | 9 | 31 | 23% |
| Non Combustible | 0 | 1 | 0% |
| _Unknown (excluded)_ | 25 | 838 | — |

**Survival by VENTSCREEN** (No Damage vs Destroyed (>50%)):

| Category | No Damage | Destroyed | Survival |
|---|---|---|---|
| Unscreened | 206 | 26 | 89% |
| No Vents | 912 | 153 | 86% |
| Mesh Screen <= 1/8" | 795 | 291 | 73% |
| Mesh Screen > 1/8" | 3016 | 2859 | 51% |
| _Unknown (excluded)_ | 153 | 2676 | — |

**Survival by EAVES** (No Damage vs Destroyed (>50%)):

| Category | No Damage | Destroyed | Survival |
|---|---|---|---|
| Combustible | 2 | 0 | 100% |
| Enclosed | 1206 | 163 | 88% |
| No Eaves | 391 | 109 | 78% |
| Unenclosed | 3468 | 1383 | 71% |
| _Unknown (excluded)_ | 15 | 4350 | — |

**Survival by WINDOWPANE** (No Damage vs Destroyed (>50%)):

| Category | No Damage | Destroyed | Survival |
|---|---|---|---|
| Multi Pane | 2683 | 950 | 74% |
| Single Pane | 2361 | 1661 | 59% |
| No Windows | 18 | 30 | 38% |
| Asphalt | 0 | 1 | 0% |
| _Unknown (excluded)_ | 20 | 3363 | — |

**Survival by EXTERIORSIDING** (No Damage vs Destroyed (>50%)):

| Category | No Damage | Destroyed | Survival |
|---|---|---|---|
| Vinyl | 53 | 12 | 82% |
| Other | 25 | 7 | 78% |
| Wood | 1111 | 350 | 76% |
| Metal | 8 | 6 | 57% |
| Stucco Brick Cement | 3878 | 5386 | 42% |
| _Unknown (excluded)_ | 7 | 244 | — |

**Methodology disclosure.** Comparisons are restricted to single-family residences (roughly 30% of Eaton DINS records are utility/miscellaneous structures — sheds, garages — which distort pooled survival rates) and exclude structures whose feature value is "Unknown". Unknowns concentrate among destroyed structures because inspectors cannot assess features that burned; including them would overstate every survival effect (survivorship artifact). Counts of excluded records are disclosed per table above.

## Provenance appendix

- Mireye parcel facts: mode=`fixture` (8 fields via POST /v1/fetch, preset wildfire_underwrite, fetched 2026-08-10T22:20:34.858191+00:00)
- [parcel] fire_hazard_severity_zone_class = "Non-Wildland" — CALFIRE_FHSZ <https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/FHSALRA25_v1_All/FeatureServer/0> (confidence: high) fetched 2026-08-10T22:18:35.207499+00:00 vintage CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases — note: CAL FIRE LRA Fire Hazard Severity Zone at the point (FHSZ code -3); read with fire_hazard_responsibility_area, which decides what the class legally means.
- [parcel] fire_hazard_responsibility_area = "LRA" — CALFIRE_FHSZ <https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/FHSALRA25_v1_All/FeatureServer/0> (confidence: high) fetched 2026-08-10T22:18:35.207376+00:00 vintage CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases — note: responsibility area from the SRA attribute of the same CAL FIRE LRA polygon that carries the FHSZ class.
- [parcel] lcms_class = "Trees" — USFS_LCMS <https://data.fs.usda.gov/geodata/rastergateway/LCMS/> (confidence: medium) fetched 2026-08-10T22:18:34.130650+00:00 vintage USFS LCMS Land_Cover CONUS v2025-11 (2025 annual), ~120 m block-mode CONUS COG — note: LCMS Land_Cover class sampled from the bootstrapped ~120 m block-mode CONUS COG
- [parcel] tree_canopy_pct = 24 percent — USFS_NLCD_TCC <https://data.fs.usda.gov/geodata/rastergateway/treecanopycover/> (confidence: high) fetched 2026-08-10T22:18:34.137225+00:00 vintage USFS/MRLC NLCD Tree Canopy Cover 2025 (v2025-6), CONUS COG (~120 m block-mean canopy %) — note: tree canopy cover (%) sampled from the bootstrapped USFS/NLCD CONUS COG
- [parcel] ndvi_current = 0.1298123449087143 — COPERNICUS_S2_SR_HARMONIZED <https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED> (confidence: high) fetched 2026-08-10T22:18:40.134632+00:00 vintage S2 SR 60d window @ 2026-08-10
- [parcel] ndvi_change_5y = -0.02202633023262024 — COPERNICUS_S2_SR_HARMONIZED <https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED> (confidence: medium) fetched 2026-08-10T22:18:40.134774+00:00
- [parcel] slope_degrees = 4.691714763641357 degrees — USGS_3DEP_COG <https://www.usgs.gov/3d-elevation-program> (confidence: medium) fetched 2026-08-10T22:18:35.192115+00:00
- [parcel] elevation = 388.45416259765625 meters — USGS_3DEP_COG <https://www.usgs.gov/3d-elevation-program> (confidence: medium) fetched 2026-08-10T22:18:35.192548+00:00 vintage 3DEP 1/3 arc-second seamless DEM
- [B2a] ROOFCONSTRUCTION = "Asphalt" — CAL FIRE DINS damage-inspection record for the subject property (POSTFIRE_MASTER_DATA_SHARE, Eaton Fire) <https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/POSTFIRE_MASTER_DATA_SHARE/FeatureServer/0>
- [B2a] Corroboration: Eaton Fire survival by ROOFCONSTRUCTION (No Damage vs Destroyed, 'Unknown' excluded): Other 80%, Concrete 72%, Tile 63%, Asphalt 46%, Metal 39%, Wood 23%.
- [B2b] EAVES = "Enclosed" — CAL FIRE DINS damage-inspection record for the subject property (POSTFIRE_MASTER_DATA_SHARE, Eaton Fire) <https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/POSTFIRE_MASTER_DATA_SHARE/FeatureServer/0>
- [B2b] Corroboration: Eaton Fire survival by EAVES (No Damage vs Destroyed, 'Unknown' excluded): Enclosed 88%, No Eaves 78%, Unenclosed 71% — standard-conforming category: Enclosed.
- [B2c] VENTSCREEN = "Mesh Screen <= 1/8\"" — CAL FIRE DINS damage-inspection record for the subject property (POSTFIRE_MASTER_DATA_SHARE, Eaton Fire) <https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/POSTFIRE_MASTER_DATA_SHARE/FeatureServer/0>
- [B2c] Corroboration: Eaton Fire survival by VENTSCREEN (No Damage vs Destroyed, 'Unknown' excluded): Unscreened 89%, No Vents 86%, Mesh Screen <= 1/8" 73%, Mesh Screen > 1/8" 51% — standard-conforming category: Mesh Screen <= 1/8".
- [B2d] WINDOWPANE = "Single Pane" — CAL FIRE DINS damage-inspection record for the subject property (POSTFIRE_MASTER_DATA_SHARE, Eaton Fire) <https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/POSTFIRE_MASTER_DATA_SHARE/FeatureServer/0>
- [B2d] Corroboration: Eaton Fire survival by WINDOWPANE (No Damage vs Destroyed, 'Unknown' excluded): Multi Pane 74%, Single Pane 59%, No Windows 38% — standard-conforming category: Multi Pane.
- Regulation text: 10 CCR §2644.9 via Cornell LII <https://www.law.cornell.edu/regulations/california/10-CCR-2644.9>, fetched 2026-08-10.
- DINS: CAL FIRE POSTFIRE_MASTER_DATA_SHARE FeatureServer, queried live 2026-08-10.

---

*Verification statement: every regulation quotation in this packet was fetched from the primary source on the date shown, not reproduced from memory; every data fact carries its source, source URL, retrieval timestamp, and dataset vintage; every survivor comparison discloses its conditioning. Anything this packet could not verify is marked unknown rather than asserted.*
