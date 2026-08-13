# Feedback for Mireye (paste into the form's Feedback field)

Building Reconsider — a California wildfire risk-score appeal agent (10 CCR §2644.9) — I leaned on
Mireye hard, and it held up. Specific, hopefully-useful notes:

**What worked.** Per-field provenance is the whole reason this project is possible. My subject
properties are intact houses, so no damage dataset will ever describe them — only your source +
timestamp + confidence + vintage on each field gives an insurance appeal evidentiary weight. The
`wildfire_underwrite` and `natural_hazard` presets gave me 24 cited facts per parcel at 1 credit
each, and the FHSZ field citing CAL FIRE's own ArcGIS server (plus FEMA NRI wildfire frequency)
turned into the anchor facts of every packet. The rooftop, parcel-grade geocode was reliable across
Altadena and La Cañada.

**`/v1/field-requests` is underrated — make it a headline feature.** Mid-build I wanted FRAP fire-
perimeter distance and last burn year, which you don't have yet. Filing the request through the MCP
tool was the best "aha" of the challenge: the agent didn't just consume the API, it extended it. Two
small things would make it even better — (1) let the filing credential read status over REST too, not
only via the MCP session that created it (I got `field_request_not_found` polling by API token); and
(2) surface an ETA-updates webhook so an agent can wire the field in automatically on delivery.

**One reliability note.** From ~5:10pm PT Aug 8 to ~3:10pm PT Aug 10, `api.mireye.com` and
`mireye.com` served plaintext on 443 (TLS "wrong version number" from both OpenSSL and LibreSSL, IPv4
and IPv6) while `docs.mireye.ai` and other Fly-hosted apps stayed up — so it looked edge/cert-specific,
not platform-wide. It resolved cleanly and everything's been solid since; flagging only for your
postmortem, since a build-challenge window is a rough time to be dark.

**Product thought.** The insurance-underwriting angle is a real wedge for you: `wildfire_underwrite`
is already a preset, and California's §2644.9 mitigation-credit regime (and the parallel FAIR Plan
pressure) means carriers and producers need exactly this cited, parcel-level evidence. Happy to share
what I learned about that buyer.

Thank you for the credits and the room to build — this was a genuinely fun problem.

— Aayush Baniya
