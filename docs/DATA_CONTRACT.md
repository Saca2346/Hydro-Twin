# DATA_CONTRACT.md

## Provenance
```ts
export type DataSource = "simulation" | "experiment" | "live";
```

## SensorReading
```ts
export interface SensorReading {
  id: string;
  sensorId: string;
  sensorName: string;
  value: number | null;
  unit: string;
  timestamp: string;
  qualityFlag: "valid" | "missing" | "range_error" | "drift_suspected" | "offline";
  source: DataSource;
}
```

## Prediction
```ts
export interface Prediction {
  timestamp: string;
  horizonSeconds: number;
  predictedPressureDropKpa: number | null;
  healthyLowerKpa: number | null;
  healthyUpperKpa: number | null;
  confidence: number | null;
  modelVersion: string | null;
  source: DataSource;
  status: "available" | "not_tested" | "insufficient_data" | "model_offline";
}
```

## Alarm
```ts
export interface Alarm {
  id: string;
  createdAt: string;
  severity: "info" | "warning" | "critical" | "invalid_data";
  parameter: string;
  reason: string;
  durationSeconds: number;
  qualityFlag: SensorReading["qualityFlag"];
  status: "unconfirmed" | "confirmed" | "false_alarm" | "closed";
  operatorValidation?: {
    operatorId: string;
    validatedAt: string;
    note?: string;
  };
}
```

## ModelMetrics
```ts
export interface ModelMetrics {
  status: "not_tested" | "available";
  mae?: number;
  rmse?: number;
  r2?: number;
  physicalResidual?: number;
  robustnessScore?: number;
  inferenceLatencyMs?: number;
  evaluatedAt?: string;
  datasetId?: string;
}
```

## Aturan penting
- Jangan menampilkan fallback angka untuk ModelMetrics.
- Jika `status === "not_tested"`, tampilkan `Belum diuji`.
- Alarm recommendation hanya aktif jika `qualityFlag === "valid"`.
