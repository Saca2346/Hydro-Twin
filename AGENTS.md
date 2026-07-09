# AGENTS.md

## Misi
Bangun aplikasi web Hydro-Twin sebagai dashboard Digital Twin prediktif untuk prototype turbin mikro-hidro.

## Prinsip wajib
1. Gunakan Bahasa Indonesia untuk seluruh teks UI.
2. Pisahkan sumber data menjadi `simulation`, `experiment`, dan `live`.
3. Semua angka contoh harus berlabel `MODE DEMO · DATA SIMULASI`.
4. Halaman Evaluasi Model secara default menampilkan `Belum diuji`.
5. Jangan membuat angka MAE, RMSE, R², robustness, residual fisika, atau latency tanpa data backend.
6. Alarm hanya boleh menghasilkan rekomendasi bila:
   - `quality_flag === "valid"`
   - anomali melewati persistence window.
7. Keputusan inspeksi harus dikonfirmasi operator.
8. Digital Twin cukup berupa skema interaktif 2D.
9. Mobile hanya untuk monitoring dan konfirmasi, bukan konfigurasi model atau threshold.
10. Tulis komponen reusable dan hindari duplikasi kode.
11. Gunakan TypeScript strict mode.
12. Tambahkan error boundary, empty state, loading state, offline state, dan invalid sensor state.
13. Jangan menyimpan API key di source code.
14. Tambahkan unit test untuk logika status, alarm, dan provenance data.
15. Tambahkan audit log untuk perubahan threshold dan model aktif.

## Teknologi yang digunakan
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts
- TanStack Table
- Zustand
- Zod
- Vitest
- React Testing Library

## Struktur target
```text
src/
  app/
  components/
  features/
    dashboard/
    monitoring/
    prediction/
    digital-twin/
    alarms/
    history/
    model-evaluation/
    devices/
    reports/
    settings/
  lib/
  mocks/
  routes/
  types/
  tests/
```

## Definition of done
- `npm run dev` berjalan tanpa error.
- `npm run build` berhasil.
- `npm run test` berhasil.
- Tidak ada error TypeScript.
- Tidak ada overflow pada viewport desktop 1440 px, tablet 1024 px, dan mobile 390 px.
- Semua contoh angka memiliki provenance `simulation`.
