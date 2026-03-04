import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import routes from './api/routes/index';
import { log } from './utils/logger';

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ─── Routes ──────────────────────────────────────────────
app.use('/api', routes);

// ─── Error Handling ──────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────
app.listen(env.PORT, () => {
    log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║      🚀 OptiForge AI Backend Server 🚀      ║
║                                               ║
║  Environment : ${env.NODE_ENV.padEnd(30)}║
║  Port        : ${String(env.PORT).padEnd(30)}║
║  Health      : http://localhost:${env.PORT}/api/health  ║
║                                               ║
╚═══════════════════════════════════════════════╝
  `);
});

export default app;
