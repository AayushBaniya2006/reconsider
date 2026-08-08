#!/usr/bin/env bash
# DINS spike queries — verified working 2026-08-07. Keyless, $0.
BASE='https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/POSTFIRE_MASTER_DATA_SHARE/FeatureServer/0/query'

# Damage distribution for Eaton
curl -s -G "$BASE" \
  --data-urlencode "where=INCIDENTNAME='Eaton'" \
  --data-urlencode "groupByFieldsForStatistics=DAMAGE" \
  --data-urlencode 'outStatistics=[{"statisticType":"count","onStatisticField":"OBJECTID","outStatisticFieldName":"n"}]' \
  --data-urlencode "f=json"

# Hardening-feature x survival crosstab (swap ROOFCONSTRUCTION for VENTSCREEN, EAVES, EXTERIORSIDING, WINDOWPANE)
curl -s -G "$BASE" \
  --data-urlencode "where=INCIDENTNAME='Eaton' AND DAMAGE IN ('No Damage','Destroyed (>50%)')" \
  --data-urlencode "groupByFieldsForStatistics=ROOFCONSTRUCTION,DAMAGE" \
  --data-urlencode 'outStatistics=[{"statisticType":"count","onStatisticField":"OBJECTID","outStatisticFieldName":"n"}]' \
  --data-urlencode "f=json"

# Full records for a demo street (addresses, coords, all hardening fields)
curl -s -G "$BASE" \
  --data-urlencode "where=INCIDENTNAME='Eaton' AND STREETNAME='Santa Rosa'" \
  --data-urlencode "outFields=SITEADDRESS,DAMAGE,ROOFCONSTRUCTION,VENTSCREEN,EAVES,EXTERIORSIDING,WINDOWPANE,YEARBUILT,ASSESSEDIMPROVEDVALUE,LATITUDE,LONGITUDE,APN" \
  --data-urlencode "outSR=4326" \
  --data-urlencode "resultRecordCount=200" \
  --data-urlencode "f=json"
