import AppRoutes from './routes';
import Navbar from './components/Navbar';
import { useLocation } from 'react-router-dom';
import './styles/main.css';

export default function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register", "/forgot-password"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}