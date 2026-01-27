# Backend Installation Troubleshooting

## Issue
Backend dependencies failing to install due to `better-sqlite3` requiring native compilation.

## Quick Fix

Run these commands in PowerShell/CMD:

```bash
# Navigate to backend
cd backend

# Install other dependencies first
npm install express cors dotenv jsonwebtoken bcryptjs multer express-validator

# Try installing better-sqlite3 separately
npm install better-sqlite3

# If that fails, try:
npm install better-sqlite3@9.2.2 --build-from-source

# Or use latest pre-built:
npm install better-sqlite3@latest
```

## Alternative: Use SQLite3 Package
If better-sqlite3 continues to fail, we can switch to the regular `sqlite3` package which has pre-built binaries.

## After Installation
Once backend dependencies are installed, run:
```bash
cd ..
npm run dev
```

This will start both backend (port 5000) and frontend (port 3000).
