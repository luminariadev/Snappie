# 📸 SNAPPIE – Photobooth Web Application

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4?style=for-the-badge&logo=tailwindcss)

SNAPPIE adalah aplikasi **photobooth berbasis web** yang memungkinkan pengguna mengambil foto dengan frame digital, memilih antara frame gratis dan premium, melakukan pembayaran, serta langsung mendownload hasil foto dengan kualitas tinggi. Dilengkapi dengan panel admin untuk manajemen konten dan transaksi.

---

## ✨ Fitur Utama

### 👤 Untuk Pengguna
- 🎯 **Ambil foto** dengan pilihan strip (1, 3, atau 4 foto)
- 🖼️ **Pilih frame** sesuai jumlah strip foto
- 👁️ **Preview real-time** dengan frame yang dipilih
- 💾 **Download otomatis** setelah sesi foto
- 🛡️ **Watermark otomatis** untuk frame premium
- 💳 **Integrasi pembayaran** dengan Midtrans
- 📱 **Responsive design** untuk semua perangkat

### 🛠️ Untuk Admin
- 📊 **Dashboard admin** untuk manajemen konten
- 🖼️ **Kelola frame** (tambah, edit, hapus)
- 📁 **Upload thumbnail & frame** dengan sistem kategori otomatis
- 💰 **Kelola transaksi** dan status pembayaran
- 🔒 **Proteksi frame** yang sudah digunakan dalam transaksi
- 📈 **Statistik penggunaan**

---

## 🧱 Tech Stack

| Layer | Teknologi | Keterangan |
|-------|-----------|------------|
| **Frontend** | React.js (Vite) | UI Framework |
| | Tailwind CSS | Styling |
| | React Router | Navigation |
| | Canvas API | Photo Processing |
| **Backend** | Node.js + Express | Server Runtime |
| | Sequelize ORM | Database Management |
| | MySQL | Database |
| | Multer | File Upload |
| | Midtrans SDK | Payment Gateway |
| **Tools** | Git + GitHub | Version Control |
| | Postman | API Testing |

---

## 📁 Struktur Project

```
snappie-photobooth/
├── frontend/                 # React Application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # CSS/Tailwind
│   │   └── App.jsx         # Main App component
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js Server
│   ├── controllers/         # Route controllers
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── uploads/            # Uploaded files (gitignored)
│   ├── config/             # Configuration files
│   ├── server.js           # Entry point
│   └── package.json
│
├── .gitignore              # Git ignore rules
├── README.md              # This file
└── LICENSE                # License file
```

> **Note:** Folder berikut **tidak di-push ke GitHub**:
> - `uploads/`
> - `frame snappie/`
> - `node_modules/`
> - `.env`

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 atau lebih baru)
- MySQL (v8.0 atau lebih baru)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/luminariadev/snappie.git
cd snappie
```

### 2. Setup Backend
```bash
cd backend
npm install

# Buat file .env
cp .env.example .env

# Edit .env dengan konfigurasi database
nano .env

# Jalankan server development
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Database Setup
```sql
-- Buat database
CREATE DATABASE snappie;

-- Jalankan migrasi
-- (Otomatis dengan Sequelize sync)
```

---

## ⚙️ Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=snappie

# Server
PORT=5000
NODE_ENV=development

# Midtrans Payment
MIDTRANS_SERVER_KEY=your_server_key_here
MIDTRANS_CLIENT_KEY=your_client_key_here

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
VITE_MIDTRANS_CLIENT_KEY=your_client_key_here
```

---

## 📡 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/frames` | Get all frames |
| GET | `/api/frames/:type` | Get frames by type (1/3/4) |
| POST | `/api/frames` | Add new frame (admin) |
| POST | `/api/photos/process` | Process photo with frame |
| POST | `/api/payment/create` | Create payment transaction |
| GET | `/api/transactions` | Get all transactions (admin) |

---

## 🎨 Screenshots

| User Interface | Admin Panel |
|----------------|-------------|
| ![Home Page](https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=Home+Page) | ![Admin Dashboard](https://via.placeholder.com/400x250/10B981/FFFFFF?text=Admin+Dashboard) |
| ![Frame Selection](https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Frame+Selection) | ![Frame Management](https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Frame+Management) |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Port already in use** | Change port in `.env` or kill process: `kill -9 $(lsof -t -i:5000)` |
| **MySQL connection failed** | Verify credentials and ensure MySQL service is running |
| **Multer upload fails** | Check folder permissions and file size limits |
| **Canvas not working** | Ensure browser supports Canvas API and check CORS settings |
| **Payment gateway error** | Verify Midtrans API keys and internet connection |

---

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Luminaria Dev**  
💻 *Shining with Code ✨*

- GitHub: [@luminariadev](https://github.com/luminariadev)
- Email: rizkianuari83@gmail.com

---

## ⭐ Support

Jika project ini membantu Anda, berikan ⭐ pada repository ini!
