import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import NavbarSelector from './components/NavbarSelector.jsx';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage'; 
import RestaurantListPage from './pages/RestaurantListPage.jsx';
import RestaurantPage from './pages/RestaurantPage.jsx';
import NotFoundPage from './pages/NotFoundPage';
import FoodListPage from './pages/FoodListPage.jsx';
import FoodDetailPage from './pages/FoodDetailPage.jsx'; 
import ProfilePage from './pages/ProfilePage.jsx';
import MapPage from './pages/MapPage.jsx';
import UnderMaintenance from './pages/UnderMaintenance.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <NavbarSelector />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />

            {/* Authentication */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Restaurant */}
            <Route path="/restaurants" element={<RestaurantListPage />} />
            <Route path="/restaurants/:id" element={<RestaurantPage />} />

            {/* Foods */}
            <Route path="/foods" element={<FoodListPage />} />
            <Route path="/foods/:id" element={<FoodDetailPage />} />
            
            {/* Profile */}
            <Route path="/profiles/:id" element={<ProfilePage />} />

            {/* 404 */}
            <Route path="/*/*" element={<NotFoundPage />} />
            <Route path="/foods/undefined" element={<NotFoundPage />} />

            {/* Under Maintenance */}
            <Route path="*" element={<UnderMaintenance />} />

          </Routes>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
