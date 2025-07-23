import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCapsuleById } from '../services/capsuleService';

export default function CapsuleDetail() {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const data = await getCapsuleById(id);
        setCapsule(data.capsule || data);
      } catch (err) {
        alert('Failed to load capsule.');
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id]);

  if (loading) return <div className="page-container">Loading capsule...</div>;
  if (!capsule) return <div className="page-container">Capsule not found.</div>;

  return (
    <div className="page-container">
      <div className="capsule-detail" style={{ backgroundColor: capsule.color || '#fff' }}>
        <div className="capsule-header">
          <span className="emoji">{capsule.emoji || '📦'}</span>
          <h2>{capsule.title || 'Untitled Capsule'}</h2>
        </div>

        <p><strong>Mood:</strong> {capsule.mood}</p>
        <p><strong>Message:</strong> {capsule.message}</p>
        <p><strong>Reveal Time:</strong> {new Date(capsule.reveal_at).toLocaleString()}</p>

        {capsule.media_type === 'image' && capsule.media_file_path && (
          <img src={capsule.media_file_path} alt="Capsule Media" className="capsule-media" />
        )}

        {capsule.media_type === 'audio' && capsule.media_file_path && (
          <audio controls src={capsule.media_file_path} className="capsule-media" />
        )}

        {capsule.media_type === 'text' && capsule.media_file_path && (
          <div className="capsule-media">
            <a href={capsule.media_file_path} target="_blank" rel="noreferrer">View text attachment</a>
          </div>
        )}
      </div>
    </div>
  );
}