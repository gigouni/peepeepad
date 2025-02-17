import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BurgerMenu.css';

export default function BurgerMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [currentPathname] = useState(pathname);

  const togglePage = () => {
    if (currentPathname === '/') {
      return navigate('/calendar');
    }

    // Fallback page
    return navigate('/');
  };

  const getMenuIcon = () => {
    if (currentPathname === '/') {
      return '🗓️';
    }
    return '🏠';
  };

  return (
    <div className="burger-menu">
      <button type="button" onClick={togglePage} className="burger-button">
        <span role="img" aria-label="menu">
          {getMenuIcon()}
        </span>
      </button>
    </div>
  );
}
