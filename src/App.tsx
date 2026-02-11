import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import DashboardLayout from '@/components/DashboardLayout';
import { AuthProvider } from '@/context/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { DashboardProvider } from '@/context/dashboard-context';

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="netalert-theme">
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/dashboard/*"
                            element={
                                <DashboardProvider>
                                    <DashboardLayout>
                                        <DashboardPage />
                                    </DashboardLayout>
                                </DashboardProvider>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <Toaster />
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
