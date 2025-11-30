# **App Name**: NetAlert AI

## Core Features:

- Real-time Network Flow Ingestion: Ingest network flow data via API and save it to Firestore.
- Feature Engineering: Automatically compute derived features from raw flow data when new flows are added.
- ML Scoring: Load a pre-trained ML model from Firebase Storage (Isolation Forest) and use it as a tool to score network flows, detecting anomalies and producing anomaly scores.
- Alert Generation: Generate alerts based on anomaly scores, saving them to Firestore and triggering FCM notifications/emails via Firebase Extensions.
- Admin Dashboard: Provide a dashboard built with Firebase Hosting, including login, data loading, displaying of alerts, and graphing trends via Chart.js.
- User Authentication: Implement user authentication using Firebase Auth Web SDK v10, ensuring only authenticated users can access the dashboard.
- Scheduled Batch Detection: Score network flows that do not have score

## Style Guidelines:

- Primary color: Midnight Blue (#191970) to convey security and intelligence.
- Background color: Dark Navy (#2E4053) to provide a dark theme that minimizes eye strain and emphasizes the data.
- Accent color: Electric Blue (#7DF9FF) for alerts, important data points, and interactive elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif, for a modern, neutral look suitable for both headlines and body text.
- Use flat, minimalist icons with a subtle outline, incorporating security and network symbols, using the Electric Blue accent color.
- Implement a card-based layout with clear sections for different types of information (flows, alerts, scores), using consistent spacing and padding.
- Subtle animations, like data loading and alert notifications.