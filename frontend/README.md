# OptiForge AI - Frontend

Production-ready Next.js 14 frontend for the OptiForge AI SaaS application.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Linting**: ESLint

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── dashboard/          # Dashboard home
│   ├── projects/           # Projects management
│   │   ├── page.tsx        # Projects list
│   │   ├── [id]/           # Project detail
│   │   └── create/         # Create project
│   ├── manual-design/      # Manual design input
│   ├── ai-generator/       # AI design generator
│   ├── analysis/           # Analysis loading
│   ├── results/            # Results page
│   └── profile/            # User profile
├── components/             # Reusable components
│   ├── Button.tsx          # Button component
│   ├── FormInput.tsx       # Form input component
│   ├── Card.tsx            # Card container
│   ├── LoadingSpinner.tsx  # Loading spinner
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── Navbar.tsx          # Top navbar
│   ├── ProtectedLayout.tsx # Protected route wrapper
│   ├── DashboardCards.tsx  # Dashboard stat cards
│   └── ProjectTable.tsx    # Project table
├── lib/                    # Utilities
│   ├── api.ts              # Axios instance
│   └── auth.ts             # Auth helpers
└── types/                  # TypeScript types
    └── index.ts            # Type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
# Copy .env.local and configure
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features

### Authentication
- Login and signup pages
- JWT token management
- Protected routes
- LocalStorage-based auth state

### Dashboard
- Stats cards
- Quick actions
- Recent projects
- Sidebar navigation

### Project Management
- Create new projects
- View project list
- Project detail pages
- Status tracking (active/completed/pending)

### Design Tools
- Manual design input form
- AI-powered design generator
- Real-time analysis progress
- Detailed results with insights

### User Profile
- Profile information management
- Password change
- Account settings
- Notification preferences

## Design System

### Color Palette
- **Primary Blue**: `#2563EB`
- **Dark Blue**: `#1E40AF`
- **Slate Dark**: `#1F2937`
- **Slate Medium**: `#374151`
- **Success Green**: `#10B981`
- **Warning Red**: `#EF4444`
- **Amber**: `#F59E0B`
- **Background**: `#F9FAFB`

### Components
All components are built with:
- Consistent 12px border radius
- Soft shadows for depth
- Hover states and transitions
- Responsive design patterns

## API Integration

The frontend is configured to connect to the Express backend. All API calls use the Axios instance in `src/lib/api.ts` which:
- Automatically adds JWT tokens to requests
- Handles common error responses
- Redirects to login on 401 errors
- Uses base URL from environment variable

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Contributing

1. Follow the existing code structure
2. Use TypeScript for all new components
3. Follow the design system color palette
4. Add proper TypeScript types
5. Test on multiple screen sizes

## License

© 2026 OptiForge AI. All rights reserved.
