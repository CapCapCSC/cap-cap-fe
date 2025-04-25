import { useAuth } from '../context/AuthContext';
import Navbar, { AuthenticatedNavbar } from './custom/Navbar';

const NavbarSelector = () => {
    const { user } = useAuth();
    const isAuthenticated = !!user;
    
    return isAuthenticated ? <AuthenticatedNavbar /> : <Navbar />;
};

export default NavbarSelector; 