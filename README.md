# School Website - Next.js + Laravel Integration

Website sekolah modern dengan Next.js frontend (Vercel) dan Laravel backend (shared hosting) menggunakan Filament untuk CRUD operations.

## 📁 Struktur Project

```
school-website/
├── src/                          # Next.js Frontend
│   ├── app/                     # App Router
│   ├── components/              # Reusable components
│   └── lib/                     # API & utilities
├── laravel-backend/             # Laravel Backend
│   ├── app/                     # Laravel app structure
│   ├── database/                # Migrations & seeders
│   └── routes/                  # API routes
├── NEXTJS_SETUP.md              # Setup guide untuk Next.js
├── laravel-backend/SETUP.md     # Setup guide untuk Laravel
└── README.md                    # File ini
```

## 🚀 Quick Start

### 1. Setup Laravel Backend

```bash
# Masuk ke folder backend
cd laravel-backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Setup database di .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Jalankan migrations
php artisan migrate

# Jalankan storage link
php artisan storage:link

# Jalankan server development
php artisan serve
```

### 2. Setup Next.js Frontend

```bash
# Di root project
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit .env.local dengan URL backend Anda
NEXT_PUBLIC_API_URL=http://api.raphnesia.my.id/api
NEXT_PUBLIC_IMAGE_BASE_URL=http://localhost:8000/storage

# Jalankan development server
npm run dev
```

### 3. Test Koneksi

Buka `http://localhost:3001/test-connection` untuk memverifikasi koneksi antara frontend dan backend.

## 📋 Fitur yang Tersedia

### ✅ CRUD Operations
- **Home Sections**: Reorder dan edit konten homepage
- **Teachers/Staff**: Manage guru dan tenaga kependidikan
- **News & Articles**: Create, edit, delete berita dan artikel
- **Profile Sections**: Manage sub-section di halaman profil
- **Facilities**: Manage fasilitas sekolah
- **School Activities**: Manage kegiatan sekolah
- **Links**: Manage link sosial media dan quick links

### 🎨 Layout Configuration
- **site-config.ts**: File konfigurasi terpusus untuk semua layout
- **Responsive design** untuk mobile dan desktop
- **SEO optimization** dengan meta tags
- **Image optimization** dengan Next.js Image component

## 🔗 API Endpoints

### Laravel Backend Routes

| Endpoint | Description |
|----------|-------------|
| `GET /api/home-sections` | Semua home sections |
| `GET /api/teachers` | Semua guru aktif |
| `GET /api/staff` | Semua staff aktif |
| `GET /api/posts` | Semua posts published |
| `GET /api/news` | Berita sekolah |
| `GET /api/articles` | Artikel sekolah |
| `GET /api/profile-sections` | Profile sections |
| `GET /api/facilities` | Fasilitas sekolah |
| `GET /api/activities` | Kegiatan sekolah |
| `GET /api/links` | Semua links |

## 🛠️ Development Tools

### Laravel Backend
- **Filament Admin**: `/admin` (default login: admin@admin.com / password)
- **API Documentation**: Auto-generated di `/api/docs`
- **Database**: MySQL dengan migrations

### Next.js Frontend
- **Hot Reload**: Auto refresh saat development
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Image Optimization**: Automatic optimization

## 📊 Testing Checklist

### ✅ Backend Testing
- [ ] Laravel server berjalan di `localhost:8000`
- [ ] Database migrations berhasil
- [ ] Filament admin accessible di `/admin`
- [ ] API endpoints responsive
- [ ] File upload berfungsi

### ✅ Frontend Testing
- [ ] Next.js server berjalan di `localhost:3001`
- [ ] Test connection page menunjukkan "All Connected"
- [ ] Images loading dari backend
- [ ] Navigation berfungsi
- [ ] Responsive design berfungsi

### ✅ Integration Testing
- [ ] API calls dari frontend ke backend berhasil
- [ ] CORS headers configured
- [ ] Image URLs berfungsi
- [ ] Data fetching berhasil

## 🚀 Deployment

### Laravel Backend (Shared Hosting)
1. Upload folder `laravel-backend` ke hosting
2. Setup database di hosting
3. Update `.env` dengan production values
4. Jalankan `composer install --optimize-autoloader --no-dev`
5. Jalankan `php artisan migrate`
6. Setup cron jobs untuk Laravel scheduler

### Next.js Frontend (Vercel)
1. Push code ke GitHub
2. Import di Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

## 🐛 Troubleshooting

### Common Issues

**CORS Error:**
- Pastikan Laravel CORS middleware aktif
- Check `config/cors.php` di Laravel

**Image Not Loading:**
- Jalankan `php artisan storage:link`
- Check `APP_URL` di `.env`

**Database Connection:**
- Check database credentials
- Pastikan MySQL service running

**API 404 Error:**
- Check `NEXT_PUBLIC_API_URL` di `.env.local`
- Pastikan Laravel server running

## 📞 Support

Untuk pertanyaan atau masalah:
1. Check file `SETUP.md` untuk detail setup
2. Gunakan halaman test connection
3. Check browser console untuk error messages
4. Pastikan semua environment variables terisi

## 📝 Catatan Penting

- **Backend URL**: Sesuaikan dengan environment (local/production)
- **Image Storage**: Gunakan `storage/app/public` untuk file uploads
- **Security**: Jangan commit file `.env` atau `.env.local`
- **Performance**: Aktifkan caching di production

---

**Created with ❤️ for Islamic School Website**
# websitealkautsar
