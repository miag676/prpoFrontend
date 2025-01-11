import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId"); 
    console.log("logout successful");
    window.location.href = "/login";
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>LitLink</h1>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <button onClick={handleLogout} style={{ ...styles.link, background: 'none', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    background: '#282c34',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};

export default Header;
