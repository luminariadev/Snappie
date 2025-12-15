# 📸 SNAPPIE – Modern Photobooth Web Application

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-✓-2496ED?style=for-the-badge&logo=docker)
![Express.js](https://img.shields.io/badge/Express.js-4.18.2-000000?style=for-the-badge&logo=express)

SNAPPIE adalah aplikasi photobooth berbasis web modern yang memungkinkan pengguna mengambil foto dengan frame digital, memilih antara frame gratis dan premium, melakukan pembayaran yang aman, serta langsung mendownload hasil foto. Dibangun dengan arsitektur containerized menggunakan Docker untuk kemudahan deployment dan konsistensi lingkungan.

---

## 🎯 Fitur Utama

### 👤 Untuk Pengguna
- 🎯 **Ambil foto** dengan pilihan strip (1, 3, atau 4 foto)
- 🖼️ **Pilih frame** dari koleksi yang tersedia
- 👁️ **Preview real-time** dengan teknologi Canvas API
- 💳 **Sistem pembayaran** terintegrasi Midtrans
- 💾 **Download otomatis** hasil foto
- 🏷️ **Watermark otomatis** untuk frame premium

### 🛠️ Untuk Admin
- 📊 **Dashboard admin** untuk manajemen konten
- 🖼️ **Kelola frame** dengan sistem upload yang mudah
- 💰 **Monitor transaksi** dan status pembayaran
- 🔒 **Manajemen akses** dan keamanan

---

## 🏗️ Arsitektur Teknologi

### Frontend Layer
- **React.js (Vite)** - UI Framework dengan build tool modern
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Canvas API** - Image processing di browser
- **Axios** - HTTP client untuk API communication

### Backend Layer
- **Node.js + Express.js** - REST API server
- **Sequelize ORM** - Database abstraction layer
- **PostgreSQL** - Relational database
- **Multer** - File upload middleware
- **JWT** - Authentication & authorization
- **Midtrans SDK** - Payment gateway integration

### Infrastructure
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **PostgreSQL** - Production-ready database

---

## 📁 Struktur Project

```
snappie-photobooth/
├── frontend/                 # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── utils/          # Utility functions
│   │   ├── layouts/       # Layouts
│   │   └── data/         # Data List Configuration
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js API Server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   ├── uploads/            # Uploaded files (gitignored)
│   ├── Dockerfile          # Backend Docker configuration
│   ├── docker-compose.yml  # Multi-container setup
│   ├── .env.example        # Environment template
│   ├── package.json
│   └── server.js           # Application entry point
│
├── .dockerignore           # Docker ignore rules
├── .gitignore             # Git ignore rules
├── README.md              # This documentation
└── LICENSE                # MIT License
```

> **Note:** File/Folder yang tidak di-push ke GitHub:
> - `node_modules/`
> - `uploads/`
> - `frame snappie/`
> - `*.env`
> - `*.log`
> - `dist/` dan `build/`

---

## 🚀 Quick Start dengan Docker

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/username/snappie.git
cd snappie-photobooth
```

### 2. Setup Environment
```bash
# Salin file environment template
cp backend/.env.example backend/.env

# Edit konfigurasi sesuai kebutuhan
nano backend/.env
```

### 3. Jalankan dengan Docker Compose
```bash
# Build dan jalankan semua service
docker-compose -f backend/docker-compose.yml up --build

# Untuk menjalankan di background (detached mode)
docker-compose -f backend/docker-compose.yml up -d
```

### 4. Akses Aplikasi
- **Backend API**: http://localhost:5000
- **Frontend Dev**: http://localhost:5173 (jika dijalankan terpisah)
- **Database**: PostgreSQL pada port 5432

### 5. Perintah Docker Lainnya
```bash
# Lihat log service
docker-compose -f backend/docker-compose.yml logs -f

# Hentikan semua service
docker-compose -f backend/docker-compose.yml down

# Hentikan dan hapus volume
docker-compose -f backend/docker-compose.yml down -v

# Restart service tertentu
docker-compose -f backend/docker-compose.yml restart backend
```

---

## ⚙️ Environment Configuration

### File: `backend/.env`
```env
# ========================
# APPLICATION CONFIGURATION
# ========================
NODE_ENV=development
PORT=5000
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173

# ========================
# DATABASE CONFIGURATION (PostgreSQL)
# ========================
DB_HOST=postgres
DB_PORT=5432
DB_NAME=snappie_db
DB_USER=snappie_user
DB_PASSWORD=your_secure_password_here
DB_DIALECT=postgres

# ========================
# PAYMENT GATEWAY (Midtrans)
# ========================
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false

# ========================
# FILE UPLOAD CONFIGURATION
# ========================
MAX_FILE_SIZE=5242880  # 5MB
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp
UPLOAD_DIR=./uploads

# ========================
# SECURITY CONFIGURATION
# ========================
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_here
CORS_ORIGIN=http://localhost:5173
```

---

## 🐳 Docker Services Architecture

### `backend/docker-compose.yml`
```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: snappie_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db:/docker-entrypoint-initdb.d
    networks:
      - snappie_network

  # Node.js Backend API
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: snappie_backend
    restart: unless-stopped
    depends_on:
      - postgres
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: ${NODE_ENV:-development}
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    networks:
      - snappie_network
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:5000/health', (r) => {if(r.statusCode!==200)throw new Error()})"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  postgres_data:
    driver: local

networks:
  snappie_network:
    driver: bridge
```

### `backend/Dockerfile`
```dockerfile
# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Development command
CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from development stage
COPY --from=development /app .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 5000

# Production command
CMD ["npm", "start"]
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/health` | Health check | ❌ |
| `GET` | `/api/frames` | Get all frames | ❌ |
| `GET` | `/api/frames/:type` | Get frames by strip type | ❌ |
| `POST` | `/api/frames` | Create new frame | ✅ |
| `PUT` | `/api/frames/:id` | Update frame | ✅ |
| `DELETE` | `/api/frames/:id` | Delete frame | ✅ |
| `POST` | `/api/photos/process` | Process photo with frame | ❌ |
| `POST` | `/api/payment/create` | Create payment transaction | ❌ |
| `POST` | `/api/payment/notification` | Midtrans payment notification | ❌ |
| `GET` | `/api/transactions` | Get all transactions | ✅ |
| `GET` | `/api/transactions/:id` | Get transaction detail | ✅ |

---

## 🗄️ Database Schema (Not All)

### Frame Types
- **1-strip**: Frame untuk 1 foto
- **3-strip**: Frame untuk 3 foto
- **4-strip**: Frame untuk 4 foto

### Frame Categories
- **FREE**: Frame gratis untuk semua pengguna
- **PREMIUM**: Frame berbayar dengan watermark

---

## 🔧 Development tanpa Docker

### Backend Setup
```bash
cd backend
npm install

# Setup database
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Run development server
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Database Migrations
```bash
# Create new migration
npx sequelize-cli migration:generate --name create-frames-table

# Run migrations
npx sequelize-cli db:migrate

# Rollback migration
npx sequelize-cli db:migrate:undo

# Seed database
npx sequelize-cli db:seed:all
```

---

## 🧪 Testing

### Unit Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### API Testing dengan Postman
```bash
# Import Postman collection
postman/snappie-api-collection.json
```

---

## 🐛 Troubleshooting

### Docker Issues
| Issue | Solution |
|-------|----------|
| Port already in use | Change port in docker-compose.yml or stop conflicting service |
| Docker build fails | Check Dockerfile syntax and network connection |
| Database connection refused | Wait for PostgreSQL to initialize (30-60 seconds) |
| Permission denied on volume | Run `sudo chown -R $USER:$USER ./uploads` |

### Database Issues
```bash
# Access PostgreSQL container
docker exec -it snappie_postgres psql -U snappie_user -d snappie_db

# Reset database
docker-compose down -v
docker-compose up --build

# View database logs
docker logs snappie_postgres
```

### Application Issues
```bash
# View backend logs
docker logs snappie_backend -f

# Restart services
docker-compose restart

# Check service status
docker-compose ps
```

---

## 📦 Deployment

### Production Deployment dengan Docker
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Production
```env
NODE_ENV=production
DB_HOST=your_production_db_host
MIDTRANS_IS_PRODUCTION=true
```

### Monitoring
- **Logs**: `docker-compose logs -f`
- **Metrics**: Prometheus + Grafana
- **Health**: `/api/health` endpoint

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for details.

---

## 👥 Authors

**Luminaria Dev Team**  
*Shining with Code ✨*

- **Lead Developer**: [@luminariadev](https://github.com/luminariadev)
- **Frontend Specialist**: [@frontend-dev](https://github.com/)
- **Backend Specialist**: [@backend-dev](https://github.com/)

### 📞 Contact
- GitHub Issues: [Report Bug / Request Feature](https://github.com/luminaria/snappie/issues)
- Email: hello@luminariadev.xyz

---

## 🙏 Acknowledgments

- [Midtrans](https://midtrans.com) for payment gateway
- [Tailwind CSS](https://tailwindcss.com) for styling framework
- [Sequelize](https://sequelize.org) for ORM
- [Vite](https://vitejs.dev) for build tool
- [Docker](https://docker.com) for containerization

---

## ⭐ Support the Project

Jika project ini bermanfaat untuk Anda, berikan ⭐ pada repository ini!

---

**Built with ❤️ using modern web technologies**  
*Deploy anywhere with Docker • Scale effortlessly • Enterprise ready*
