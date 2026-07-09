# DESIGN.md

## Identitas
Nama produk: Hydro-Twin  
Jenis: Dashboard Digital Twin prediktif untuk turbin mikro-hidro  
Bahasa UI: Bahasa Indonesia

## Design tokens

### Warna
- Navy utama: `#17365D`
- Navy sekunder: `#1F4E79`
- Teal utama: `#2A9D8F`
- Teal gelap: `#167C70`
- Latar aplikasi: `#F4F7FA`
- Kartu: `#FFFFFF`
- Teks utama: `#1F2937`
- Teks sekunder: `#64748B`
- Garis: `#D7E0EA`
- Normal: `#2E7D32`
- Normal background: `#E7F4E8`
- Peringatan: `#F59E0B`
- Peringatan background: `#FFF4D8`
- Kritis: `#C62828`
- Kritis background: `#FDE8E8`
- Data simulasi: `#7C3AED`
- Data simulasi background: `#F0EAFE`

### Tipografi
Gunakan Inter.
- H1: 24/32, 700
- H2: 18/26, 700
- H3: 14/22, 700
- Body: 14/22, 400
- Small: 12/18, 400
- Label: 11/16, 600
- Metric: 30/36, 700, tabular numbers

### Spasi dan bentuk
- Sistem spasi: kelipatan 4 px
- Card radius: 14 px
- Button radius: 10 px
- Input radius: 8 px
- Sidebar desktop: 240 px
- Topbar: 64 px
- Shadow: ringan, hindari glassmorphism berlebihan

## Terminologi baku
- Pressure drop → Beda Tekanan
- Prediction → Prediksi Kondisi
- Residual → Penyimpangan dari Kondisi Sehat
- Data quality → Kualitas Data
- Inspection needed → Perlu Inspeksi
- Digital Twin → Digital Twin
- Model evaluation → Evaluasi Model

## Navigasi
1. Ringkasan
2. Monitoring Real-Time
3. Prediksi Kondisi
4. Digital Twin
5. Alarm & Inspeksi
6. Riwayat Data
7. Evaluasi Model
8. Perangkat & Sensor
9. Laporan
10. Pengaturan

## Aturan visual
- Badge provenance data harus terlihat pada topbar.
- Status tidak boleh dibedakan hanya dengan warna; selalu gunakan label dan ikon.
- Grafik wajib memiliki satuan, sumbu waktu, legenda, dan rentang sehat.
- Hindari rumus matematika pada layar operator.
- Gunakan gambar pada `references/` sebagai sumber visual utama.
