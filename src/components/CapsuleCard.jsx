import { Link } from 'react-router-dom';

export default function CapsuleCard({ capsule }) {
  return (
    <Link
      to={`/capsules/${capsule.id}`}
      className="capsule-card"
      style={{ backgroundColor: capsule.color || '#2c2c2c' }}
    >
      <div className="capsule-header">
        <span className="emoji">{capsule.emoji || '📦'}</span>
        <h3>{capsule.title || 'Untitled'}</h3>
      </div>
      <p>{capsule.message?.slice(0, 80)}...</p>
      <span className="reveal-date">
        Reveal: {new Date(capsule.reveal_at).toLocaleDateString()}
      </span>
    </Link>
  );
}
