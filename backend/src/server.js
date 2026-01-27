require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./models/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/budget', require('./routes/budget'));
app.use('/api/user', require('./routes/user'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'OptiForge AI API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Initialize and start server
async function startServer() {
    try {
        // Initialize database
        await initializeDatabase();

        // Start server
        app.listen(PORT, () => {
            console.log('='.repeat(50));
            console.log('🚀 OptiForge AI Backend Server');
            console.log('='.repeat(50));
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log(`✅ API endpoint: http://localhost:${PORT}/api`);
            console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('='.repeat(50));
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
