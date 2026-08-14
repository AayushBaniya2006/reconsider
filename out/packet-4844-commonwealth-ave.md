# Wildfire Risk Score Review — Recommendation: Remediate Before Appealing

**Subject property:** 4844 Commonwealth Ave, La Canada Flintridge, CA 91011
**Date:** 2026-08-14
**Prepared for the policyholder and producer — not for filing.** Complete the actions below first; when filed, the producer's §2644.9(j) 5-day forwarding duty applies.

## Decision

**REMEDIATE-FIRST** — No enumerated standard is documented as met or unmet for this property. An appeal must argue from the §2644.9(d)(1) standards, so filing now would rest on exposure facts alone. Document the checklist below first; the decision re-runs when evidence lands.

Scorecard: 0 met · 0 not met · 12 unknown (of 12 enumerated standards).

## Subject parcel exposure — independently cited facts

CAL FIRE's official Fire Hazard Severity Zone map (CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases) classifies the subject parcel as **Very High** (responsibility area: LRA). The written reconsideration required by §2644.9(i) should reconcile the insurer's wildfire risk score with the State's own hazard classification of this parcel.

Modeled annual wildfire frequency at the parcel: **1.87e-3** (FEMA_NRI, confidence medium).

| Fact | Value | Source | Confidence | Vintage |
|---|---|---|---|---|
| wildfire_annual_frequency | 0.002 | FEMA_NRI | medium | FEMA National Risk Index per-tract annualized frequencies (local table; NOAA SPC/NCEI/Vaisala source data) |
| fire_hazard_severity_zone_class | Very High | CALFIRE_FHSZ | high | CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases |
| fire_hazard_responsibility_area | LRA | CALFIRE_FHSZ | high | CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases |
| slope_degrees | 4.152 degrees | USGS_3DEP_COG | medium | — |
| lcms_class | Barren or Impervious | USFS_LCMS | medium | USFS LCMS Land_Cover CONUS v2025-11 (2025 annual), ~120 m block-mode CONUS COG |
| tree_canopy_pct | 23 percent | USFS_NLCD_TCC | high | USFS/MRLC NLCD Tree Canopy Cover 2025 (v2025-6), CONUS COG (~120 m block-mean canopy %) |
| ndvi_current | 0.085 | COPERNICUS_S2_SR_HARMONIZED | high | S2 SR 60d window @ 2026-08-10 |
| ndvi_change_5y | -0.068 | COPERNICUS_S2_SR_HARMONIZED | medium | — |
| elevation | 409.178 meters | USGS_3DEP_COG | medium | 3DEP 1/3 arc-second seamless DEM |

**Broader hazard context** (natural-hazard screen of the same parcel — 13 additional cited facts; wildfire is the only hazard class at issue in this appeal):

| Fact | Value | Source | Confidence | Vintage |
|---|---|---|---|---|
| seismic_pga_2pct_50yr_g | 0.885 g | USGS_NSHM | medium | USGS 2023 Conterminous U.S. NSHM (uniform-hazard ground motion maps, VS30=760 B/C; DOI 10.5066/P9GNPCOD) |
| seismic_design_category | D | USGS_DESIGNMAPS_ASCE7 | high | ASCE 7-22 (USGS provisional) |
| design_wind_speed_mph | 103 mph | NOAA_ASCE_WIND_VECTORS | medium | ASCE 7-22 700-yr MRI / Risk Cat II (NOAA CC0 mirror, local gpkg) |
| tornado_annual_frequency | 0 | FEMA_NRI | medium | FEMA National Risk Index per-tract annualized frequencies (local table; NOAA SPC/NCEI/Vaisala source data) |
| hail_annual_frequency | 0.085 | FEMA_NRI | medium | FEMA National Risk Index per-tract annualized frequencies (local table; NOAA SPC/NCEI/Vaisala source data) |
| lightning_annual_flash_days | 10.397 days | FEMA_NRI | medium | FEMA National Risk Index per-tract annualized frequencies (local table; NOAA SPC/NCEI/Vaisala source data) |
| landslide_susceptibility_index | 35 | USGS_LANDSLIDE_SUSCEPTIBILITY | medium | USGS Slope-Relief-Threshold landslide susceptibility (n10_susc, 2024) |
| nearest_dam_distance_m | 3074.4 m | USACE_NID | medium | USACE National Inventory of Dams (local GeoPackage mirror of the Esri-hosted NID_v1 FeatureServer) |
| nearest_dam_hazard_potential | High | USACE_NID | medium | USACE National Inventory of Dams (local GeoPackage mirror of the Esri-hosted NID_v1 FeatureServer) |
| high_hazard_dams_within_10km | 14 | USACE_NID | medium | USACE National Inventory of Dams (local GeoPackage mirror of the Esri-hosted NID_v1 FeatureServer) |
| in_karst_area | false | USGS_KARST | medium | USGS National Karst Map OFR 2014-1156 (local GeoPackage reduction, simplified ~90 m) |
| soil_shrink_swell_class | null | NRCS_gNATSGO | medium | — |
| within_floodplain_polygon | false | FEMA_NFHL | high | 06037C_STUDY2 |

Location resolution: rooftop-accuracy geocode (parcel-grade) of "4844 Commonwealth Ave, La Canada Flintridge, CA 91011" via geocodio.

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
| B2a (10 CCR §2644.9(d)(1)(B)2.) | Class-A Fire Rated Roof | unknown | No evidence available yet. |
| B2b (10 CCR §2644.9(d)(1)(B)2.) | Enclosed Eaves | unknown | No evidence available yet. |
| B2c (10 CCR §2644.9(d)(1)(B)2.) | Fire-Resistant Vents | unknown | No evidence available yet. |
| B2d (10 CCR §2644.9(d)(1)(B)2.) | Multipane windows, including dual pane windows, or functional shutters | unknown | No evidence available yet. |
| B2e (10 CCR §2644.9(d)(1)(B)2.) | At least six (6) inches of noncombustible vertical clearance at the bottom | unknown | No evidence available yet. |

## Evidence checklist — document these, then decide

1. **B1b** — Clearing of vegetation, debris, mulch, stored combustible materials, and any and all movable combustible objects, from the area within five (5) feet
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
2. **B1c** — Incorporation of only noncombustible materials into that portion of any improvements situated within five (5) feet
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
3. **B2a** — Class-A Fire Rated Roof
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
4. **B2c** — Fire-Resistant Vents
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
5. **A1** — Fire Risk Reduction Community listed by the Board of Forestry pursuant to Public Resources Code section 4290.1
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
6. **A2** — Firewise USA Site in Good Standing
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
7. **B1a** — Clearing of vegetation and debris from under decks
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
8. **B1d** — Removal or absence of combustible structures from the area within thirty (30) feet
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
9. **B1e** — Whether the property complies with Section 4291 of the Public Resources Code, and any applicable local ordinances
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
10. **B2b** — Enclosed Eaves
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
11. **B2d** — Multipane windows, including dual pane windows, or functional shutters
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.
12. **B2e** — At least six (6) inches of noncombustible vertical clearance at the bottom
   - No evidence in either direction — document status (photos, receipts, inspection report) before filing.

## Demand under §2644.9(k)(B)

The eventual appeal will demand, for each mitigation measure below, the disclosure the regulation requires, verbatim:

> The amount of premium reduction the policyholder or applicant would realize as a result of performing each such measure under the insurer’s rating plan that is in effect at the time.

No enumerated standard is documented as unmet. We demand the itemized premium-reduction schedule for every mitigation measure recognized in the rating plan in effect, so remaining unknowns can be converted to documented credits.

## Corroboration: CAL FIRE DINS survivor comparables (Eaton Fire)

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

- Mireye parcel facts: mode=`fixture` (24 fields via POST /v1/fetch, preset wildfire_underwrite, fetched 2026-08-10T23:52:32.726746+00:00)
- [parcel] seismic_pga_2pct_50yr_g = 0.8849999904632568 g — USGS_NSHM <https://www.sciencebase.gov/catalog/item/644af897d34e45f6ddcd13b3> (confidence: medium) fetched 2026-08-10T23:52:32.493170+00:00 vintage USGS 2023 Conterminous U.S. NSHM (uniform-hazard ground motion maps, VS30=760 B/C; DOI 10.5066/P9GNPCOD) — note: PGA (g) with 2% probability of exceedance in 50 yr (~2475-yr return), site class BC (VS30=760); sampled from the bootstrapped USGS 2023 NSHM uniform-hazard CONUS COG
- [parcel] seismic_design_category = "D" — USGS_DESIGNMAPS_ASCE7 <https://earthquake.usgs.gov/ws/designmaps/> (confidence: high) fetched 2026-08-10T23:52:33.258772+00:00 vintage ASCE 7-22 (USGS provisional) — note: siteClass=D riskCategory=II (assumed defaults; Ss=2.19 S1=0.72 SDS=1.51)
- [parcel] design_wind_speed_mph = 103 mph — NOAA_ASCE_WIND_VECTORS <https://services2.arcgis.com/C8EMgrsFcRFL6LrL/arcgis/rest/services/ASCE_Wind_Vectors/FeatureServer> (confidence: medium) fetched 2026-08-10T23:52:32.518660+00:00 vintage ASCE 7-22 700-yr MRI / Risk Cat II (NOAA CC0 mirror, local gpkg) — note: banded 3-second-gust basic design wind speed (mph), Exposure C (point-in-polygon; local gpkg mirror)
- [parcel] wildfire_annual_frequency = 0.0018715079388487447 — FEMA_NRI <https://hazards.fema.gov/nri/> (confidence: medium) fetched 2026-08-10T23:52:32.520626+00:00 vintage FEMA National Risk Index per-tract annualized frequencies (local table; NOAA SPC/NCEI/Vaisala source data) — note: annualized frequency for Census tract 06037460502 — events/yr
- [parcel] tornado_annual_frequency = 0.00010480593383738997 — FEMA_NRI <https://hazards.fema.gov/nri/> (confidence: medium) fetched 2026-08-10T23:52:32.520659+00:00 vintage FEMA National Risk Index per-tract annualized frequencies (local table; NOAA SPC/NCEI/Vaisala source data) — note: annualized frequency for Census tract 06037460502 — events/yr
- [parcel] hail_annual_frequency = 0.08471696640276383 — FEMA_NRI <https://hazards.fema.gov/nri/> (confidence: medium) fetched 2026-08-10T23:52:32.520667+00:00 vintage FEMA National Risk Index per-tract annualized frequencies (local table; NOAA SPC/NCEI/Vaisala source data) — note: annualized frequency for Census tract 06037460502 — events/yr
- [parcel] lightning_annual_flash_days = 10.397460999999998 days — FEMA_NRI <https://hazards.fema.gov/nri/> (confidence: medium) fetched 2026-08-10T23:52:32.520675+00:00 vintage FEMA National Risk Index per-tract annualized frequencies (local table; NOAA SPC/NCEI/Vaisala source data) — note: annualized frequency for Census tract 06037460502 — lightning days/yr
- [parcel] landslide_susceptibility_index = 35 — USGS_LANDSLIDE_SUSCEPTIBILITY <https://www.sciencebase.gov/catalog/item/65ccea5bd34ef4b119cb3bac> (confidence: medium) fetched 2026-08-10T23:52:32.491523+00:00 vintage USGS Slope-Relief-Threshold landslide susceptibility (n10_susc, 2024) — note: sampled from the bootstrapped n10_susc CONUS COG at the point
- [parcel] nearest_dam_distance_m = 3074.4 m — USACE_NID <https://nid.sec.usace.army.mil/> (confidence: medium) fetched 2026-08-10T23:52:32.533767+00:00 vintage USACE National Inventory of Dams (local GeoPackage mirror of the Esri-hosted NID_v1 FeatureServer) — note: straight-line distance to the nearest inventoried dam — a screening signal, not inundation exposure
- [parcel] nearest_dam_hazard_potential = "High" — USACE_NID <https://nid.sec.usace.army.mil/> (confidence: medium) fetched 2026-08-10T23:52:32.533696+00:00 vintage USACE National Inventory of Dams (local GeoPackage mirror of the Esri-hosted NID_v1 FeatureServer) — note: USACE consequence-of-failure class of the nearest dam — not a condition or failure-probability rating
- [parcel] high_hazard_dams_within_10km = 14 — USACE_NID <https://nid.sec.usace.army.mil/> (confidence: medium) fetched 2026-08-10T23:52:32.533782+00:00 vintage USACE National Inventory of Dams (local GeoPackage mirror of the Esri-hosted NID_v1 FeatureServer) — note: count of High hazard-potential NID dams in the 10 km band; a floor — sub-inventory-threshold dams are absent
- [parcel] in_karst_area = false — USGS_KARST <https://doi.org/10.3133/ofr20141156> (confidence: medium) fetched 2026-08-10T23:52:32.518342+00:00 vintage USGS National Karst Map OFR 2014-1156 (local GeoPackage reduction, simplified ~90 m)
- [parcel] karst_type = null — USGS_KARST <https://doi.org/10.3133/ofr20141156> (confidence: medium) fetched 2026-08-10T23:52:32.518420+00:00 vintage USGS National Karst Map OFR 2014-1156 (local GeoPackage reduction, simplified ~90 m) — note: in_karst_area is False (no mapped karst or pseudokarst unit at the point)
- [parcel] karst_exposure_class = null — USGS_KARST <https://doi.org/10.3133/ofr20141156> (confidence: medium) fetched 2026-08-10T23:52:32.518435+00:00 vintage USGS National Karst Map OFR 2014-1156 (local GeoPackage reduction, simplified ~90 m) — note: in_karst_area is False (no mapped karst or pseudokarst unit at the point)
- [parcel] fire_hazard_severity_zone_class = "Very High" — CALFIRE_FHSZ <https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/FHSALRA25_v1_All/FeatureServer/0> (confidence: high) fetched 2026-08-10T23:01:23.769635+00:00 vintage CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases — note: CAL FIRE LRA Fire Hazard Severity Zone at the point (FHSZ code 3); read with fire_hazard_responsibility_area, which decides what the class legally means.
- [parcel] fire_hazard_responsibility_area = "LRA" — CALFIRE_FHSZ <https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/FHSALRA25_v1_All/FeatureServer/0> (confidence: high) fetched 2026-08-10T23:01:23.769548+00:00 vintage CAL FIRE OSFM LRA FHSZ (recommended), map dated 2025-03-24, all 4 rollout phases — note: responsibility area from the SRA attribute of the same CAL FIRE LRA polygon that carries the FHSZ class.
- [parcel] soil_shrink_swell_class = null — NRCS_gNATSGO <https://storage.googleapis.com/mireye-earth-data/soils/gnatsgo_mukey_conus_fy2025.tif> (confidence: medium) fetched 2026-08-10T23:52:32.667541+00:00 — note: binned from dominant-component shallowest-horizon lep_r
- [parcel] within_floodplain_polygon = false — FEMA_NFHL <https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28> (confidence: high) fetched 2026-08-10T23:52:32.489249+00:00 vintage 06037C_STUDY2 — note: FEMA NFHL Flood Hazard Zones intersect, but not an SFHA: Zone X; AREA OF MINIMAL FLOOD HAZARD; SFHA_TF=F; FLD_AR_ID=06037C_5417; SOURCE_CIT=06037C_STUDY2.
- [parcel] slope_degrees = 4.152191638946533 degrees — USGS_3DEP_COG <https://www.usgs.gov/3d-elevation-program> (confidence: medium) fetched 2026-08-10T23:01:23.576880+00:00
- [parcel] lcms_class = "Barren or Impervious" — USFS_LCMS <https://data.fs.usda.gov/geodata/rastergateway/LCMS/> (confidence: medium) fetched 2026-08-10T23:01:22.374003+00:00 vintage USFS LCMS Land_Cover CONUS v2025-11 (2025 annual), ~120 m block-mode CONUS COG — note: LCMS Land_Cover class sampled from the bootstrapped ~120 m block-mode CONUS COG
- [parcel] tree_canopy_pct = 23 percent — USFS_NLCD_TCC <https://data.fs.usda.gov/geodata/rastergateway/treecanopycover/> (confidence: high) fetched 2026-08-10T23:01:22.380184+00:00 vintage USFS/MRLC NLCD Tree Canopy Cover 2025 (v2025-6), CONUS COG (~120 m block-mean canopy %) — note: tree canopy cover (%) sampled from the bootstrapped USFS/NLCD CONUS COG
- [parcel] ndvi_current = 0.08546008169651031 — COPERNICUS_S2_SR_HARMONIZED <https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED> (confidence: high) fetched 2026-08-10T23:01:25.422182+00:00 vintage S2 SR 60d window @ 2026-08-10
- [parcel] ndvi_change_5y = -0.06848154962062836 — COPERNICUS_S2_SR_HARMONIZED <https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED> (confidence: medium) fetched 2026-08-10T23:01:25.422291+00:00
- [parcel] elevation = 409.1783447265625 meters — USGS_3DEP_COG <https://www.usgs.gov/3d-elevation-program> (confidence: medium) fetched 2026-08-10T23:01:23.577195+00:00 vintage 3DEP 1/3 arc-second seamless DEM
- Regulation text: 10 CCR §2644.9 via Cornell LII <https://www.law.cornell.edu/regulations/california/10-CCR-2644.9>, fetched 2026-08-14.
- DINS: CAL FIRE POSTFIRE_MASTER_DATA_SHARE FeatureServer, queried live 2026-08-14.

---

*Verification statement: every regulation quotation in this packet was fetched from the primary source on the date shown, not reproduced from memory; every data fact carries its source, source URL, retrieval timestamp, and dataset vintage; every survivor comparison discloses its conditioning. Anything this packet could not verify is marked unknown rather than asserted.*
