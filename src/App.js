import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; 
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoute {...route} />}
            />
          ))}
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ component: Component, protected: isProtected, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isProtected && isAuthenticated && rest.path !== "/login") {
    return <Navigate to="/" replace />;
  }

  return <Component {...rest} />;
};


export default App;
