import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GameDashboard from './components/GameDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameDashboard />} />
      </Routes>
    </Router>
  );
}
