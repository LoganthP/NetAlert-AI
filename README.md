# 🚨 NetAlert-AI Dashboard

<h3 align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-4.0-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
</h3>

<p align="center">
  <b>NetAlert-AI Dashboard is the advanced command center for the NetAlert intelligent network monitoring platform.</b><br/>
  <i>Visualize threats, monitor network flows, and manage security alerts in real-time with a premium, glassmorphism-inspired UI.</i>
</p>

---

[Check out the Live Demo](#) · [Report Bug](#) · [Request Feature](#)

## 📚 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔎 Overview

**NetAlert-AI Dashboard** provides a cutting-edge visual interface for security operations teams. Unlike traditional, cluttered dashboards, we focus on **actionable intelligence** presented through a sleek, highly responsive interface.

It connects to the NetAlert AI backend to display:
- Real-time network anomaly alerts
- Geographic distribution of threats
- Live packet flow visualizations
- AI-driven threat analysis and reporting

---

## ✨ Key Features

### 🖥️ Premium User Experience
- **Glassmorphism Design**: Modern, translucent UI components that provide depth and hierarchy.
- **Theme System**: Fully dynamic Light and Dark modes with semantic coloring.
- **Responsive Layout**: Seamlessly adapts to large control room screens and laptops.

### 🔐 Enhanced Authentication
- **Secure Access**: Robust Sign In and Sign Up flows.
- **Role-Based Access**: Specialized views for Administrators and Security Testers.
- **User Profiles**: Personalized profile management with role verification badges.

### 📊 Advanced Visualization
- **Live Attack Map**: Interactive 3D/2D world map showing attack origins and targets.
- **Flow Analysis**: Sankey diagrams and time-series charts for network traffic.
- **Geo-Distribution**: Widget visualizing the physical location of threat actors.

### 🛡️ Security Operations
- **Alert Management**: Real-time alert feed with drill-down capabilities.
- **Reporting Engine**: Automated PDF Generation for executive summaries and technical audits.
- **Threat Intelligence**: Integrated views for AI-summarized threat contexts.

---

## 🛠️ Technology Stack

This project is built with a modern, performance-first frontend stack:

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `tailwindcss-animate`
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Maps**: [React Simple Maps](https://www.react-simple-maps.io/) & [D3.js](https://d3js.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **AI Integration**: [Google GenKit](https://firebase.google.com/docs/genkit) (Experimental)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LoganthP/NetAlert-AI.git
   cd NetAlert-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Both the frontend (Vite) and the lightweight backend server (Express) will start concurrently.
   - Frontend: `http://localhost:5173`
   - Data Server: `http://localhost:3001`

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication forms (Tabs, Sign In/Up)
│   ├── dashboard/      # Dashboard widgets (Maps, Charts, Stats)
│   ├── layouts/        # Page layouts (Header, Sidebar)
│   └── ui/             # Core Shadcn UI primitives
├── context/            # Global state (Auth, Theme, Dashboard Data)
├── hooks/              # Custom React hooks (useAuth, useTheme)
├── lib/                # Utilities, types, and mock data generators
├── pages/              # Route components (Login, Dashboard, Profile)
│   └── dashboard/      # Sub-pages (Overview, Flows, Alerts)
└── styles/             # Global CSS and Tailwind directives
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
