import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>&copy; {new Date().getFullYear()} LitLink</p>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#282c34',
    padding: '10px 20px',
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  text: {
    margin: 0,
    fontSize: '0.9rem',
  },
};

export default Footer;
