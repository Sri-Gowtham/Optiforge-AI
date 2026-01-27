const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { promisify } = require('util');

const dbPath = path.join(__dirname, '..', process.env.DATABASE_PATH || 'database.db');
const db = new sqlite3.Database(dbPath);

// Promisify database methods with proper context handling for sqlite3
const dbRun = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
};

const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));

// Initialize database schema
async function initializeDatabase() {
    try {
        // Enable foreign keys
        await dbRun('PRAGMA foreign_keys = ON');

        // Users table
        await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Projects table
        await dbRun(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        file_path TEXT,
        intended_use TEXT,
        budget REAL,
        timeline TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        // Analyses table
        await dbRun(`
      CREATE TABLE IF NOT EXISTS analyses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        visual_score INTEGER,
        performance_score INTEGER,
        materials_score INTEGER,
        cost_score INTEGER,
        feasibility_score INTEGER,
        overall_score INTEGER,
        recommendations TEXT,
        analysis_data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )
    `);

        console.log('✅ Database initialized successfully');
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        throw error;
    }
}

// User model
const UserModel = {
    create: async (email, hashedPassword, name) => {
        const result = await dbRun(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            [email, hashedPassword, name]
        );
        return result.lastID;
    },

    findByEmail: async (email) => {
        return await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    },

    findById: async (id) => {
        return await dbGet(
            'SELECT id, email, name, created_at FROM users WHERE id = ?',
            [id]
        );
    },

    updateProfile: async (id, name) => {
        return await dbRun('UPDATE users SET name = ? WHERE id = ?', [name, id]);
    },

    updatePassword: async (id, hashedPassword) => {
        return await dbRun('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);
    }
};

// Project model
const ProjectModel = {
    create: async (userId, projectData) => {
        const result = await dbRun(
            `INSERT INTO projects (user_id, name, description, file_path, intended_use, budget, timeline, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                projectData.name,
                projectData.description,
                projectData.filePath,
                projectData.intendedUse,
                projectData.budget,
                projectData.timeline,
                'pending'
            ]
        );
        return result.lastID;
    },

    findByUserId: async (userId) => {
        return await dbAll(
            'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
    },

    findById: async (id, userId) => {
        return await dbGet(
            'SELECT * FROM projects WHERE id = ? AND user_id = ?',
            [id, userId]
        );
    },

    update: async (id, userId, data) => {
        return await dbRun(
            `UPDATE projects 
       SET name = ?, description = ?, intended_use = ?, budget = ?, timeline = ?
       WHERE id = ? AND user_id = ?`,
            [data.name, data.description, data.intendedUse, data.budget, data.timeline, id, userId]
        );
    },

    updateStatus: async (id, status) => {
        return await dbRun('UPDATE projects SET status = ? WHERE id = ?', [status, id]);
    },

    delete: async (id, userId) => {
        return await dbRun('DELETE FROM projects WHERE id = ? AND user_id = ?', [id, userId]);
    },

    getStats: async (userId) => {
        const total = await dbGet('SELECT COUNT(*) as count FROM projects WHERE user_id = ?', [userId]);
        const completed = await dbGet('SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND status = ?', [userId, 'completed']);
        const analyzing = await dbGet('SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND status = ?', [userId, 'analyzing']);

        return {
            total: total.count,
            completed: completed.count,
            analyzing: analyzing.count
        };
    }
};

// Analysis model
const AnalysisModel = {
    create: async (projectId, analysisData) => {
        const result = await dbRun(
            `INSERT INTO analyses (
        project_id, visual_score, performance_score, materials_score, 
        cost_score, feasibility_score, overall_score, recommendations, analysis_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                projectId,
                analysisData.visualScore,
                analysisData.performanceScore,
                analysisData.materialsScore,
                analysisData.costScore,
                analysisData.feasibilityScore,
                analysisData.overallScore,
                JSON.stringify(analysisData.recommendations),
                JSON.stringify(analysisData.detailedAnalysis)
            ]
        );
        return result.lastID;
    },

    findByProjectId: async (projectId) => {
        const result = await dbGet(
            'SELECT * FROM analyses WHERE project_id = ? ORDER BY created_at DESC LIMIT 1',
            [projectId]
        );
        if (result) {
            result.recommendations = JSON.parse(result.recommendations);
            result.analysis_data = JSON.parse(result.analysis_data);
        }
        return result;
    },

    getAverageScore: async (userId) => {
        const result = await dbGet(
            `SELECT AVG(a.overall_score) as avg_score
       FROM analyses a
       JOIN projects p ON a.project_id = p.id
       WHERE p.user_id = ?`,
            [userId]
        );
        return Math.round(result.avg_score || 0);
    }
};

module.exports = {
    db,
    initializeDatabase,
    UserModel,
    ProjectModel,
    AnalysisModel
};
