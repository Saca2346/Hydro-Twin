export function LoadingState({ message = 'Memuat data...' }: { message?: string }) {
  return (
    <div className="loading-state">
      <div className="loading-spinner" />
      <p className="loading-message">{message}</p>
    </div>
  );
}
