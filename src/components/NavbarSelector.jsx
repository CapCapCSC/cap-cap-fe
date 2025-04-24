import { useNavbar } from '../context/NavbarContext';
import Navbar, { AuthenticatedNavbar } from './custom/Navbar';

const NavbarSelector = () => {
    const { isAuthenticated } = useNavbar();
    
    return isAuthenticated ? <AuthenticatedNavbar /> : <Navbar />;
};

export default NavbarSelector; 