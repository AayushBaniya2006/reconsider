To: founders@mireye.com
Subject: Build Challenge — wildfire score-appeal agent + a field request

Hi — I'm Aayush. For the Build Challenge I'm building **Reconsider**: an agent that prepares California wildfire risk-score appeals under 10 CCR §2644.9. When a homeowner gets their score (insurers must disclose it 75 days before any non-renewal), the agent assembles the appeal: your cited, timestamped facts about the subject parcel, scored against the Safer-from-Wildfires standards, corroborated with CAL FIRE DINS survivor comparables — houses with the same hardening features that survived the Eaton Fire — then files it through the broker, who has a statutory 5-day forwarding duty, and tracks the insurer's 10-day acknowledgment clock. Closing demand: the §2644.9(k)(B) dollar disclosure of what each mitigation is worth in premium.

Mireye is load-bearing for a specific reason: the subject property is intact, so no damage database will ever describe it — only your per-field source, timestamp, and confidence give the packet its evidentiary weight.

**Field request** (also submitting via /v1/field-requests): *distance to nearest historical wildfire perimeter + most recent burn year* (CAL FIRE FRAP perimeters). For a parcel outside every perimeter, "nothing has burned here since X, per FRAP, and here's the distance" is an anchor fact of every appeal.

I'm on the GROWTH code — if batch testing gets tight on credits I'll shout. Happy to share the repo as it comes together this week.

P.S. — possible outage report (delete if fixed by the time you read this): as of ~5:25pm PT Aug 8, `api.mireye.com` and `mireye.com` answer TLS on 443 with plaintext — "wrong version number" from both OpenSSL and LibreSSL, on IPv4 and IPv6 — while `docs.mireye.ai` and other Fly-hosted apps load fine from the same network and Fly's status page is green. Your MCP server was up earlier tonight (issued my OAuth authorize URL), then dropped mid-flow, so this looks like a recent deploy or cert change at your edge rather than anything platform-wide.

Aayush Baniya
thisisaayushbaniya@gmail.com
