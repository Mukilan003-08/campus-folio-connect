
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Admins from "./pages/Admins";
import Portfolio from "./pages/Portfolio";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Student Routes */}
            <Route 
              path="/portfolio" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Portfolio />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Navigate to="/portfolio" replace />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/achievements" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Navigate to="/portfolio" replace />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin & Super Admin Routes */}
            <Route 
              path="/students" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <Students />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/portfolios" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <Navigate to="/students" replace />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/department" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <Navigate to="/students" replace />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <Navigate to="/" replace />
                </ProtectedRoute>
              } 
            />
            
            {/* Super Admin Only Routes */}
            <Route 
              path="/admins" 
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <Admins />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/departments" 
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <Navigate to="/admins" replace />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <Navigate to="/" replace />
                </ProtectedRoute>
              } 
            />
            
            {/* Error and Utility Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/profile" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
