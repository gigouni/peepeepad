import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getTodayDog,
  linkDogToDay,
} from '../../../main/localstorage/dogPerDate.storage';
import { getDogs } from '../../../main/localstorage/dogs.storage';
import { getTodayTimestamp, getTomorrowTimestamp } from '../../../main/misc';
import { useEvent } from '../../EventContext';
import './BurgerMenu.css';

export default function BurgerMenu() {
  const { setEvent } = useEvent();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [currentPathname] = useState(pathname);

  const isHomePage = () => {
    return currentPathname === '/';
  };

  const isCalendarPage = () => {
    return currentPathname === '/calendar';
  };

  const togglePage = () => {
    if (isHomePage()) {
      return navigate('/calendar');
    }

    // Fallback page
    return navigate('/');
  };

  const getMenuIcon = () => {
    if (isHomePage()) {
      return '🗓️';
    }
    return '🏠';
  };

  const getRefreshIcon = () => {
    return '🔄';
  };

  const handleCalendarIconClick = async () => {
    // Auto-assign the dogs based on the current day
    // If today is not assigned, assign the first dog
    // For tomorrow, assign the next dog of the today's one (or the first one if we're at the end of the list)
    let todayDog = getTodayDog(true);
    const dogs = getDogs();

    if (!todayDog) {
      console.log('No dog assigned for today, assigning the first one');
      const todayTimestamp = getTodayTimestamp();

      // Auto-assign the first dog to today
      await linkDogToDay(todayTimestamp, 0);
      [todayDog] = dogs;
    }

    const todayDogIndex = dogs.findIndex((dog) => dog === todayDog);

    // Take the next dog except if we're at the end of the list
    const tomorrowDogIndex =
      todayDogIndex + 1 === dogs.length ? 0 : todayDogIndex + 1;

    const tomorrowTimestamp = getTomorrowTimestamp();
    await linkDogToDay(tomorrowTimestamp, tomorrowDogIndex);

    // Refresh the Calendar
    setEvent('refresh-calendar');
  };

  return (
    <div className="burger-menu">
      <button type="button" onClick={togglePage} className="burger-button">
        <span role="img" aria-label="menu">
          {getMenuIcon()}
        </span>
      </button>

      {isCalendarPage() && (
        <button
          type="button"
          onClick={handleCalendarIconClick}
          className="burger-button burger-button-refresh"
        >
          <span role="img" aria-label="menu">
            {getRefreshIcon()}
          </span>
        </button>
      )}
    </div>
  );
}
