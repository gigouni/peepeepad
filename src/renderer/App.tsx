import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CalendarViewer from './pages/CalendarViewer/CalendarViewer';
import Home from './pages/Home/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<CalendarViewer />} />
      </Routes>
    </Router>
  );
}
