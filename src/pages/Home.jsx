import { useEffect, useState } from 'react';
import { filterWallCapsules } from '../services/capsuleService';
import CapsuleCard from '../components/CapsuleCard';

export default function Home() {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    country: '',
    mood: '',
    range: '',
  });

  useEffect(() => {
    const fetchCapsules = async () => {
      setLoading(true);
      try {
        const data = await filterWallCapsules(filters);
        setCapsules(data.capsules || []);
      } catch (err) {
        console.error('Failed to fetch capsules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-container">
      <section className="hero-section">
        <h1>Create your time capsule</h1>
        <p>Write a message to your future self or loved ones, add photos and videos, and set a date for it to be revealed</p>
        <a href="/capsules/create" className="cta-button">Create Capsule</a>
      </section>

      <h2>Recently revealed capsules</h2>

      <div className="filters-bar">
        <select name="country" value={filters.country} onChange={handleFilterChange}>
          <option value="">Country</option>
          <option value="LB">Lebanon</option>
          <option value="US">USA</option>
          <option value="UK">UK</option>
          <option value="CA">Canada</option>
        </select>

        <select name="mood" value={filters.mood} onChange={handleFilterChange}>
          <option value="">Mood</option>
          <option value="happy">Happy</option>
          <option value="nostalgic">Nostalgic</option>
          <option value="grateful">Grateful</option>
          <option value="sad">Sad</option>
          <option value="excited">Excited</option>
        </select>

        <select name="range" value={filters.range} onChange={handleFilterChange}>
          <option value="">Time Range</option>
          <option value="past7">Last 7 Days</option>
          <option value="future">Upcoming</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {loading && <p>Loading capsules...</p>}
      {!loading && capsules.length === 0 && <p>No capsules found for these filters.</p>}

      <div className="capsule-list">
        {capsules.map(capsule => (
            <CapsuleCard key={capsule.id} capsule={capsule} />
        ))}
      </div>
    </div>
  );
}