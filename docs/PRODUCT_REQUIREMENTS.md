# PRODUCT_REQUIREMENTS.md

## Tujuan
Membangun dashboard Hydro-Twin yang membantu operator memahami kondisi turbin, menilai kualitas data, melihat prediksi kondisi, meninjau alarm, dan mencatat hasil inspeksi.

## Pengguna
- Operator PLTMH
- Teknisi pemeliharaan
- Peneliti
- Administrator

## Halaman wajib

### Ringkasan
- Status utama terlihat dalam 5 detik.
- KPI: beda tekanan, debit, putaran, daya.
- Grafik aktual dan prediksi.
- Kualitas data, alarm aktif, dan sinkronisasi.
- Rekomendasi operasional.

### Monitoring Real-Time
- Data sensor dan mini trend.
- Filter waktu dan sensor.
- Quality flag.
- Mode pause/resume.
- Offline dan packet-loss state.

### Prediksi Kondisi
- Horizon 10 detik dan 60 detik.
- Rentang sehat.
- Tingkat keyakinan.
- Faktor dominan.
- Label simulasi jika data bukan eksperimen/live.

### Digital Twin
- Skema 2D interaktif.
- Klik komponen untuk melihat status, sensor, alarm, dan catatan inspeksi.
- Tampilan sistem, sensor, status, dan aliran data.

### Alarm & Inspeksi
- Tabel alarm.
- Detail alasan, durasi, quality flag, dan rekomendasi.
- Konfirmasi operator.
- Tandai alarm palsu.
- Buat inspeksi.

### Riwayat Data
- Filter, pencarian, pagination.
- Export CSV/PDF.
- Kolom visibility.
- Detail raw value, cleaned value, prediction, provenance, model version.

### Evaluasi Model
- Default `Belum diuji`.
- Metrik hanya muncul dari endpoint backend.
- Tabel baseline dan PINN.
- Empty state dan status eksperimen.

### Perangkat & Sensor
- Status koneksi.
- Kalibrasi terakhir.
- Firmware.
- Drift dan missing rate.
- Maintenance history.

### Laporan
- Laporan kondisi.
- Alarm.
- Inspeksi.
- Performa model.
- Kualitas sensor.

### Pengaturan
- Role-based access.
- Threshold.
- Model aktif.
- Notifikasi.
- Audit log.
- Konfirmasi sebelum perubahan kritis.

## Non-goals fase pertama
- Kontrol aktuator otomatis.
- Diagnosis kerusakan definitif.
- Rekonstruksi 3D turbin.
- Training PINN di browser.
