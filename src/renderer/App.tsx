import { useEffect, useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { localPreloadDogPerDates } from '../main/localstorage/dogPerDate.storage';
import { localPreloadDogs } from '../main/localstorage/dogs.storage';
import { initializeTables } from '../main/remote-db/common.db';
import './App.css';
import CalendarViewer from './pages/CalendarViewer/CalendarViewer';
import Home from './pages/Home/Home';
import { EventProvider } from './EventContext';

export default function App() {
  const [initDone, setInitDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeTables();
        console.log('Dogs preloading');
        await localPreloadDogs();
        console.log('Dog per dates preloading');
        await localPreloadDogPerDates();
        console.log('Dogs and dog per dates preloaded successfully');

        setIsLoading(false);
        setInitDone(true);
      } catch (error) {
        console.error('Error during tables initialization:', error);
      }
    };

    if (!initDone) {
      initializeApp();
    }
  }, [initDone]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<CalendarViewer />} />
        </Routes>
      </Router>
    </EventProvider>
  );
}
