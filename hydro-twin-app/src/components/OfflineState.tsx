export function OfflineState() {
  return (
    <div className="offline-state card">
      <div className="offline-state-icon">🔌</div>
      <h3 className="offline-state-title">Koneksi Terputus</h3>
      <p className="offline-state-desc">
        Sistem tidak dapat terhubung ke sumber data. Memeriksa koneksi kembali...
      </p>
      <div className="loading-spinner" style={{ margin: '16px auto 0', width: 24, height: 24 }} />
    </div>
  );
}
