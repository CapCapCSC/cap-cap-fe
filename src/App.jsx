import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RestaurantListPage from './pages/RestaurantListPage.jsx';
import RestaurantPage from './pages/RestaurantPage.jsx';

import FoodListPage from './pages/FoodListPage.jsx';
import FoodDetailPage from './pages/FoodDetailPage.jsx';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<HomePage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Restaurant */}
        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />

        {/* Foods */}
        <Route path="/foods" element={<FoodListPage />} />
        {/* <Route path="/restaurants/:id/foods" element={<FoodListPage />} />*/}
        <Route path="/foods/:id" element={<FoodDetailPage />} />

        {/* 404 */}
      </Routes>
    </Router>
  );
}

export default App;
