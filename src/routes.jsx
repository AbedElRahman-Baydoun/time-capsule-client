import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import CreateCapsule from './pages/CreateCapsule';
import EditProfile from './pages/EditProfile';
import CapsuleDetail from './pages/CapsuleDetail';
import SharedCapsule from './pages/SharedCapsule';

import ProtectedRoute from './components/ProtectedRoute';

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route
          path="/capsules/create"
          element={<ProtectedRoute><CreateCapsule /></ProtectedRoute>}
        />
        <Route
          path="/capsules/:id"
          element={<ProtectedRoute><CapsuleDetail /></ProtectedRoute>}
        />
        <Route
          path="/profile/edit"
          element={<ProtectedRoute><EditProfile /></ProtectedRoute>}
        />
        <Route
          path="/capsule/share/:token"
          element={<SharedCapsule />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
}