import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

// Get port from environment or use default
const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase();

        // Start Express server
        const server = app.listen(PORT, () => {
            console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║        🚀 OptiForge AI Backend Server 🚀         ║
║                                                   ║
║  Environment: ${process.env.NODE_ENV || 'development'}                        ║
║  Port: ${PORT}                                      ║
║  Database: Connected ✅                           ║
║                                                   ║
║  API Endpoints:                                   ║
║  - Health: http://localhost:${PORT}/health          ║
║  - Auth: http://localhost:${PORT}/api/auth          ║
║  - Projects: http://localhost:${PORT}/api/projects  ║
║  - Designs: http://localhost:${PORT}/api/designs    ║
║  - Analysis: http://localhost:${PORT}/api/analysis  ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
      `);
        });

        // Graceful shutdown handlers
        const gracefulShutdown = async (signal) => {
            console.log(`\n${signal} received. Starting graceful shutdown...`);

            server.close(async () => {
                console.log('✅ HTTP server closed');

                await disconnectDatabase();

                console.log('✅ Graceful shutdown completed');
                process.exit(0);
            });

            // Force shutdown after 10 seconds
            setTimeout(() => {
                console.error('⚠️  Forced shutdown after timeout');
                process.exit(1);
            }, 10000);
        };

        // Handle shutdown signals
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            console.error('❌ Unhandled Promise Rejection:', err);
            gracefulShutdown('UNHANDLED_REJECTION');
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();
