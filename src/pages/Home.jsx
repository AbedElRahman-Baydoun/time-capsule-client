import { useEffect, useState } from 'react';
import { getUserCapsules } from '../services/capsuleService';
import { Link } from 'react-router-dom';

export default function Home() {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const data = await getUserCapsules();
        setCapsules(data.capsules || []);
      } catch (err) {
        console.error('Failed to fetch capsules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  return (
    <div className="page-container">
      <h2>My Capsules</h2>

      {loading && <p>Loading capsules...</p>}
      {!loading && capsules.length === 0 && <p>You haven't created any capsules yet.</p>}

      <div className="capsule-list">
        {capsules.map(capsule => (
          <Link
            to={`/capsules/${capsule.id}`}
            key={capsule.id}
            className="capsule-card"
            style={{ backgroundColor: capsule.color || '#f2f2f2' }}
          >
            <div className="capsule-header">
              <span className="emoji">{capsule.emoji || '📦'}</span>
              <h3>{capsule.title || 'Untitled Capsule'}</h3>
            </div>
            <p>{capsule.message?.slice(0, 80)}...</p>
            <span className="reveal-date">Reveal: {new Date(capsule.reveal_at).toLocaleString()}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}