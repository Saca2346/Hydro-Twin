interface SensorInvalidStateProps {
  sensorName: string;
  reason?: string;
}

export function SensorInvalidState({ sensorName, reason = 'Data di luar rentang valid.' }: SensorInvalidStateProps) {
  return (
    <div className="sensor-invalid-state card">
      <div className="sensor-invalid-header">
        <span className="sensor-invalid-icon">⚠️</span>
        <h4 className="sensor-invalid-title">Sensor {sensorName} Bermasalah</h4>
      </div>
      <p className="sensor-invalid-desc">{reason}</p>
      <p className="sensor-invalid-action">Perlu inspeksi fisik segera.</p>
    </div>
  );
}
