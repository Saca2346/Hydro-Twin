# TEST_PLAN.md

## Unit test
- Mapping quality flag ke status visual.
- Aturan alarm persisten.
- Alarm tidak valid tidak menghasilkan rekomendasi.
- State ModelMetrics `not_tested`.
- Provenance badge.
- Formatter satuan.

## Component test
- MetricCard.
- StatusBadge.
- DataSourceBadge.
- AlarmTable.
- ModelEvaluationEmptyState.
- DigitalTwinComponentPanel.

## Integration test
- Login → Ringkasan.
- Alarm → Detail → Konfirmasi.
- Sensor → Detail.
- Laporan → Pratinjau → Export.
- Offline → retry.

## Visual verification
Bandingkan dengan folder `references/`.
Periksa:
- Sidebar 240 px.
- Topbar 64 px.
- Card radius.
- Spacing.
- Chart labels.
- No clipping.
- No black export artifacts.
