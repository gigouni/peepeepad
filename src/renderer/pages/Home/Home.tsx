import { useState } from 'react';
import { getTodayDog } from '../../../main/storage';
import Header from '../../components/Header/Header';
import './Home.css';

export default function Home() {
  const [dogName] = useState(getTodayDog());

  return (
    <div className="home-page">
      <Header />
      <div className="home-content">
        <h1>C&apos;est {dogName} qui dort avec nous 🐶</h1>
      </div>
    </div>
  );
}
