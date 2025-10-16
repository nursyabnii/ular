# Ular Neon - Game Ular Klasik dengan Twist Modern 🐍✨
Ini adalah implementasi modern dari game ular klasik, dibangun dari nol menggunakan HTML, CSS, dan JavaScript. Game ini memiliki desain visual bertema neon, kontrol yang responsif, dan beberapa level permainan untuk menantang pemain.

# 🎮 Deskripsi Singkat
Ular Neon mengambil gameplay adiktif dari game ular orisinal dan memberinya sentuhan visual yang segar dengan efek cahaya neon. Pemain mengontrol ular untuk memakan makanan yang muncul secara acak, membuatnya tumbuh lebih panjang. Tujuannya adalah untuk mendapatkan skor setinggi mungkin tanpa menabrak diri sendiri atau rintangan.

# 🔥 Fitur Utama
1. Desain Neon Modern: Tampilan visual yang menarik dengan efek cahaya dan warna-warna cerah.
2. Tiga Level Permainan:
   - Level 1: Dinding bisa ditembus (mode klasik).
   - Level 2: Menabrak dinding akan mengakhiri permainan.
   - Level 3: Dinding mematikan dan rintangan acak muncul di papan.
3. Kontrol Responsif: Dapat dimainkan dengan mudah di desktop menggunakan tombol panah dan di perangkat mobile dengan kontrol sentuh di layar.
4. Sistem High Score: Skor tertinggi Anda akan disimpan di browser menggunakan localStorage, jadi Anda bisa terus mencoba mengalahkan rekor Anda sendiri.
5. Efek Suara: Dilengkapi dengan audio untuk aksi seperti memakan makanan, memilih level, dan saat permainan berakhir.
6. Kontrol Dalam Game: Terdapat tombol Pause/Resume dan Home untuk kontrol penuh selama bermain.

# 📂 Struktur File
Proyek ini diorganisir menjadi beberapa file untuk keterbacaan dan pemeliharaan yang lebih baik:

```
/project-folder
│
├── index.html         # Struktur utama dan layout halaman web
├── style.css          # Semua gaya visual (termasuk tema neon)
├── script.js          # Seluruh logika dan fungsionalitas game
│
├── eat.mp3            # Suara saat ular makan
├── lose.mp3           # Suara saat game over
└── click.mp3          # Suara saat memilih level
```

# 🚀 Cara Menjalankan
Anda tidak memerlukan server atau alat build apa pun untuk menjalankan game ini. Cukup ikuti langkah-langkah berikut:
Clone atau Unduh Proyek:
1. Pastikan semua file (index.html, style.css, script.js, dan tiga file .mp3) berada di dalam folder yang sama.
2. Buka File index.html:
3. Buka file index.html langsung di browser web favorit Anda (seperti Chrome, Firefox, atau Edge).
4. Mulai Bermain!
5. Pilih level dari menu utama untuk memulai permainan. Selamat menikmati!

# 🛠️ Teknologi yang Digunakan
- HTML5: Untuk struktur dasar dan elemen game.
- CSS3: Untuk styling, layout responsif, dan efek visual neon.
- JavaScript (Vanilla): Untuk semua logika game, kontrol, dan interaktivitas tanpa dependensi eksternal.