To: founders@mireye.com
Subject: Build Challenge — wildfire score-appeal agent + a field request

Hi — I'm Aayush. For the Build Challenge I'm building **Reconsider**: an agent that prepares California wildfire risk-score appeals under 10 CCR §2644.9. When a homeowner gets their score (insurers must disclose it 75 days before any non-renewal), the agent assembles the appeal: your cited, timestamped facts about the subject parcel, scored against the Safer-from-Wildfires standards, corroborated with CAL FIRE DINS survivor comparables — houses with the same hardening features that survived the Eaton Fire — then files it through the broker, who has a statutory 5-day forwarding duty, and tracks the insurer's 10-day acknowledgment clock. Closing demand: the §2644.9(k)(B) dollar disclosure of what each mitigation is worth in premium.

Mireye is load-bearing for a specific reason: the subject property is intact, so no damage database will ever describe it — only your per-field source, timestamp, and confidence give the packet its evidentiary weight.

**Field request** (also submitting via /v1/field-requests): *distance to nearest historical wildfire perimeter + most recent burn year* (CAL FIRE FRAP perimeters). For a parcel outside every perimeter, "nothing has burned here since X, per FRAP, and here's the distance" is an anchor fact of every appeal.

I'm on the GROWTH code — if batch testing gets tight on credits I'll shout. Happy to share the repo as it comes together this week.

P.S. — in case it's useful for your postmortem: `api.mireye.com` and `mireye.com` served plaintext on 443 (TLS "wrong version number" from both OpenSSL and LibreSSL, IPv4 and IPv6) from ~5:10pm PT Aug 8 until ~3:10pm PT Aug 10 — I had a monitor polling every 5 minutes, so those bounds are tight. `docs.mireye.ai` and other Fly-hosted apps were fine from the same network throughout, so it looked edge-config-specific rather than platform-wide. Everything's been solid since recovery — the pipeline above ran its first live pulls this afternoon.

Aayush Baniya
thisisaayushbaniya@gmail.com
