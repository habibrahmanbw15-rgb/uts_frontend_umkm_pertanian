# Sistem Katalog Produk UMKM Pertanian 🌾
Repositori ini berisi kode sumber untuk Ujian Tengah Semester (UTS) mata kuliah **Pemrograman Frontend**, yang membangun aplikasi web berbasis *Single Page / Multi-Page* interaktif untuk mendukung digitalisasi UMKM sektor pertanian.

## 👥 Identitas Proyek
* **Tema Tugas:** Sistem Katalog Produk UMKM Pertanian (3 Kategori: Hasil Panen, Bibit, Pupuk)
* **NIM Ganjil:** Implementasi Hak Akses Peran (*Role-Based Access Control* antara Admin dan Tamu)

---

## 🛠️ Teknologi yang Digunakan
Proyek ini dibangun murni menggunakan teknologi standar web modern tanpa framework atau pustaka pihak ketiga eksternal (*Vanilla Stack*):
* **HTML5 Semantik:** Struktur halaman yang terorganisir dengan elemen semantik modern (`<header>`, `<main>`, `<section>`, `<article>`).
* **CSS3 Modern & Mobile-First:** Desain tata letak responsif menggunakan CSS Grid, Flexbox, serta pemisahan file stylesheet agar mudah dikustomisasi.
* **JavaScript ES6+ (Modular):** Penerapan modul JavaScript (`type="module"`) untuk memisahkan fungsi logika (*services*), render antarmuka (*UI renderers*), validasi form, dan manajemen status sesi.
* **Browser LocalStorage:** Penyimpanan data sisi klien (*client-side storage*) untuk memastikan data produk dan sesi login tetap tersimpan secara lokal.

---

## 📂 Struktur Direktori Proyek
```text
uts_proyek/
├── login.html                  # Halaman 1: Autentikasi / Masuk (Admin / Tamu)
├── index.html                  # Halaman 2: Katalog Produk Publik (Pencarian & Filter)
├── dashboard.html              # Halaman 3: Dashboard Admin (Form Input & Tabel Kelola)
└── assets/
    ├── css/
    │   ├── style.css           # Styling utama & tata letak responsif
    │   └── dashboard.css       # Styling khusus halaman dashboard & tabel admin
    └── js/
        ├── loginApp.js         # Logika autentikasi login
        ├── catalogApp.js       # Logika interaksi katalog publik
        ├── dashboardApp.js     # Logika CRUD dan interaksi tabel admin
        ├── productService.js   # Layanan manajemen data produk (LocalStorage)
        ├── uiRenderer.js       # Modul perender kartu produk dinamis
        ├── validator.js        # Modul validasi form masukan
        └── authService.js      # Layanan manajemen hak akses sesi (Admin vs Guest)