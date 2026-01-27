# OptiForge AI

**AI-Powered Product Design Optimization Platform**

OptiForge AI helps engineering students, designers, and startups get instant AI-powered feedback on their product designs. Upload your design, receive comprehensive analysis from 5 specialized AI agents, and optimize for cost, performance, and manufacturability.

---

## 🚀 Features

✨ **AI-Powered Analysis** - 5 specialized agents analyze design quality, performance, materials, cost, and feasibility  
🎨 **Beautiful UI** - Modern, professional interface with smooth animations  
📊 **Budget Tracking** - Monitor costs and get detailed cost breakdowns  
📁 **Project Management** - Organize multiple designs in one dashboard  
📈 **Visual Analytics** - Charts and graphs to track progress  
🔐 **Secure Authentication** - JWT-based auth with encrypted passwords  
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile  

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite (lightning-fast builds)
- **React Router v6** (client-side routing)
- **Axios** (API communication)
- **Recharts** (data visualization)
- **React Dropzone** (file uploads)

### Backend
- **Node.js + Express** (RESTful API)
- **SQLite3** with better-sqlite3 (file-based database)
- **JWT** (authentication)
- **bcryptjs** (password hashing)
- **Multer** (file uploads)

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Optiforge-AI
```

2. **Install all dependencies**
```bash
npm run install-all
```

This will install dependencies for the root, backend, and frontend.

3. **Start the development server**
```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:5000`
- Frontend app on `http://localhost:3000`

The frontend will automatically open in your browser!

---

## 📁 Project Structure

```
Optiforge-AI/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context (auth)
│   │   ├── services/     # API service layer
│   │   ├── styles/       # Global CSS
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   └── package.json
│
├── backend/               # Express API server
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, uploads
│   │   ├── utils/        # AI engine, helpers
│   │   └── server.js     # Entry point
│   ├── uploads/          # Uploaded files
│   ├── database.db       # SQLite database
│   └── package.json
│
├── package.json          # Root package with scripts
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `GET /api/projects` - Get all projects (protected)
- `POST /api/projects` - Create project with file (protected)
- `GET /api/projects/:id` - Get project details (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)
- `POST /api/projects/:id/analyze` - Run AI analysis (protected)
- `GET /api/projects/stats` - Get user stats (protected)

### Budget
- `GET /api/budget` - Get budget summary (protected)
- `GET /api/budget/:projectId` - Get project budget (protected)

### User
- `PUT /api/user/profile` - Update profile (protected)
- `PUT /api/user/password` - Change password (protected)

---

## 🤖 AI Analysis System

The platform uses 5 specialized AI agents to analyze product designs:

1. **Visual Design Agent** (Score: 70-95)
   - Analyzes aesthetics, proportions, visual hierarchy
   - Provides design recommendations

2. **Performance Agent** (Score: 65-90)
   - Evaluates structural integrity and efficiency
   - Suggests performance optimizations

3. **Materials Agent** (Score: 60-95)
   - Recommends optimal materials
   - Analyzes durability and sustainability

4. **Cost Estimation Agent** (Score: 70-100)
   - Calculates manufacturing costs
   - Provides detailed cost breakdown

5. **Manufacturing Feasibility Agent** (Score: 65-92)
   - Assesses manufacturability
   - Recommends production methods

**Analysis Time:** 10-15 seconds  
**Overall Score:** Weighted average of all 5 agents

> **Note:** The current system uses sophisticated mock AI responses. Real AI integration can be added later by replacing the `aiEngine.js` module.

---

## 📸 Features Walkthrough

### 1. Landing Page
- Hero section with value proposition
- Features showcase
- How it works (3-step process)
- Call-to-action buttons

### 2. Dashboard
- Project statistics
- Recent projects table
- Quick actions
- Analytics charts

### 3. New Project
- Drag-and-drop file upload
- Project details form
- Budget and timeline inputs
- Instant AI analysis trigger

### 4. Project Details
- 5-agent analysis results
- Individual scores and overallrating
- Detailed recommendations
- Budget breakdown
- PDF report download (coming soon)

### 5. Budget Tracking
- Total budget vs estimated costs
- Project-by-project breakdown
- Cost variance analysis
- Visual charts

### 6. Settings
- Update profile information
- Change password
- Account preferences

---

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
DATABASE_PATH=./database.db
UPLOAD_DIR=./uploads
NODE_ENV=development
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This builds the frontend to `frontend/dist/`

### Start Production Server

```bash
npm start
```

### Deploy to Vercel/Netlify/Railway

1. **Frontend**: Deploy `frontend/` folder to Vercel or Netlify
2. **Backend**: Deploy `backend/` folder to Railway or Heroku
3. Update API base URL in frontend to point to deployed backend

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign up new user
- [ ] Login with credentials
- [ ] Create new project with file upload
- [ ] Trigger AI analysis (wait 10-15 seconds)
- [ ] View analysis results
- [ ] Check budget tracking
- [ ] Update user profile
- [ ] Change password
- [ ] Delete project
- [ ] Logout

---

## 📝 Development Scripts

```bash
# Install all dependencies
npm run install-all

# Run frontend and backend concurrently
npm run dev

# Run backend only
npm run backend

# Run frontend only
npm run frontend

# Build frontend for production
npm run build

# Start production server
npm start
```

---

## 🎨 Brand Colors

- **Primary Blue:** `#667eea`
- **Secondary Purple:** `#764ba2`
- **Accent Gold:** `#fbbf24`
- **Success Green:** `#10b981`

---

## 🤝 Contributing

This is a production-ready application. To add features:

1. Backend: Add controllers in `backend/src/controllers/`
2. Frontend: Add pages in `frontend/src/pages/`
3. API: Update routes in `backend/src/routes/`

---

## 📄 License

MIT License - Feel free to use this project for learning and commercial purposes.

---

## 🎯 Future Enhancements

- [ ] Real AI integration (replace mock engine)
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Team collaboration features
- [ ] Version compare (multiple iterations)
- [ ] 3D model viewer
- [ ] Export to CAD formats

---

## 💡 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@optiforge.ai (placeholder)

---

**Built with ❤️ for designers and engineers worldwide**

OptiForge AI - Transform Your Design Process with AI
