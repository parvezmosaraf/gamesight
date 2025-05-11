import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import GameDetails from '@/pages/GameDetails';
import About from '@/pages/About';
import AuthPages from '@/pages/AuthPages';
import NotFound from '@/pages/NotFound';
import Predictions from '@/pages/Predictions';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/predictions" element={
        <ProtectedRoute>
          <Predictions />
        </ProtectedRoute>
      } />
      <Route path="/game/:id" element={<GameDetails />} />
      <Route path="/auth/*" element={<AuthPages />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
} 