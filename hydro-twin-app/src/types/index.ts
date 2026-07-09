// Data provenance types
export type DataSource = "simulation" | "experiment" | "live";

export type QualityFlag = "valid" | "missing" | "range_error" | "drift_suspected" | "offline";

export interface SensorReading {
  id: string;
  sensorId: string;
  sensorName: string;
  value: number | null;
  unit: string;
  timestamp: string;
  qualityFlag: QualityFlag;
  source: DataSource;
}

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

export interface Alarm {
  id: string;
  createdAt: string;
  severity: "info" | "warning" | "critical" | "invalid_data";
  parameter: string;
  reason: string;
  durationSeconds: number;
  qualityFlag: QualityFlag;
  status: "unconfirmed" | "confirmed" | "false_alarm" | "closed";
  operatorValidation?: {
    operatorId: string;
    validatedAt: string;
    note?: string;
  };
}

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

export interface Asset {
  id: string;
  name: string;
}

export interface SensorConfig {
  id: string;
  name: string;
  unit: string;
  value: number | null;
  qualityFlag: QualityFlag;
}

export interface SimulationData {
  source: DataSource;
  asset: Asset;
  sensors: SensorConfig[];
  modelMetrics: ModelMetrics;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

// Audit log
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  details: string;
  category: "threshold" | "model" | "alarm" | "system";
}
