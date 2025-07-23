import { Link, useNavigate } from 'react-router-dom';
import '../styles/main.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate('/')}>⏳ Time Capsule</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/capsules/create">Create</Link>
        <Link to="/profile/edit">Edit Profile</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}