<h1 align="center">🚨 NetAlert-AI Dashboard</h1>

<h3 align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-4.0-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</h3>

<p align="center">
  <b>The advanced command center for the NetAlert intelligent network monitoring platform.</b><br/>
  Visualize threats, monitor network flows, and manage security alerts in real-time with a premium glassmorphism-inspired UI.
</p>

<p align="center">
  <a href="https://github.com/LoganthP/NetAlert-AI">Repository</a> ·
  <a href="https://github.com/LoganthP/NetAlert-AI/issues">Report Bug</a> ·
  <a href="https://github.com/LoganthP/NetAlert-AI/issues">Request Feature</a>
</p>

---

## 🌍 Overview

**NetAlert-AI Dashboard** is a modern Security Operations Center (SOC) interface designed for real-time threat monitoring and network intelligence visualization.

Unlike traditional cluttered dashboards, NetAlert-AI focuses on:

- Actionable intelligence  
- Clear visual hierarchy  
- High-performance rendering  
- Security-first architecture  

It connects to the NetAlert AI backend to display:

- Real-time network anomaly alerts  
- Geographic distribution of threats  
- Live packet flow visualizations  
- AI-driven threat summaries and reports  

---

## ✨ Key Features

### 🖥️ Premium User Experience
- Glassmorphism UI with depth and transparency  
- Fully dynamic Light / Dark theme system  
- Responsive design for large SOC displays and laptops  

### 🔐 Secure Authentication
- Sign In / Sign Up flows  
- Role-based dashboards (Admin / Security Tester)  
- Profile management with verification badges  

### 📊 Advanced Data Visualization
- Interactive attack world map (2D/3D ready)  
- Sankey flow diagrams for network traffic  
- Time-series anomaly charts  
- Geo-distribution threat widgets  

### 🛡️ Security Operations
- Real-time alert management system  
- Drill-down alert inspection  
- Automated PDF report generation  
- AI-generated threat context summaries  

---

## 🛠 Technology Stack

### Frontend Core
- React 18  
- Vite  
- TypeScript  

### Styling & UI
- Tailwind CSS  
- tailwindcss-animate  
- Radix UI  
- Shadcn UI  
- Lucide React  

### Data & Visualization
- Recharts  
- D3.js  
- React Simple Maps  

### Forms & Validation
- React Hook Form  
- Zod  

### AI Integration
- Google GenKit (Experimental)  

---

## 🏗 System Architecture

```text
Client (React + Vite)
        │
        ▼
Dashboard UI Components
        │
        ▼
Context & Hooks Layer
(Auth • Theme • Dashboard Data)
        │
        ▼
Backend API (Express)
        │
        ▼
NetAlert AI Engine
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

---

### Installation

```bash
git clone https://github.com/LoganthP/NetAlert-AI.git
cd NetAlert-AI
npm install
```

---

### Run Development Server

```bash
npm run dev
```

This will start:

- Frontend → http://localhost:5173  
- Data Server → http://localhost:3001  

---

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Maps, Charts, Stats
│   ├── layouts/           # Header, Sidebar
│   └── ui/                # Core Shadcn UI components
├── context/               # Global state management
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and mock generators
├── pages/
│   ├── Login.tsx
│   ├── Profile.tsx
│   └── dashboard/
│       ├── Overview.tsx
│       ├── Flows.tsx
│       └── Alerts.tsx
└── styles/
```

---

## 🧪 Testing

```bash
npm run test
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch  
3. Commit your changes  
4. Push to your branch  
5. Open a Pull Request  
- Share it with others  
- Contribute improvements  
