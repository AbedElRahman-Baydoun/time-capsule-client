import { useState } from 'react';
import { createCapsule } from '../services/capsuleService';
import { useNavigate } from 'react-router-dom';

export default function CreateCapsule() {
  const [form, setForm] = useState({
    title: '',
    message: '',
    mood: 'happy',
    emoji: '📦',
    color: '#f2f2f2',
    reveal_at: '',
    privacy: 'private',
  });

  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('text');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in form) formData.append(key, form[key]);
      formData.append('media_type', mediaType);
      if (media) formData.append('media_file', media);

      await createCapsule(formData);
      navigate('/');
    } catch (err) {
      alert('Failed to create capsule.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Create Capsule</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea name="message" placeholder="Your message..." value={form.message} onChange={handleChange} rows={4} />

        <label>Emoji</label>
        <input type="text" name="emoji" value={form.emoji} onChange={handleChange} maxLength={2} />

        <label>Color</label>
        <input type="color" name="color" value={form.color} onChange={handleChange} />

        <label>Mood</label>
        <select name="mood" value={form.mood} onChange={handleChange}>
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="excited">🤩 Excited</option>
          <option value="nostalgic">🕰 Nostalgic</option>
          <option value="angry">😡 Angry</option>
          <option value="grateful">🙏 Grateful</option>
        </select>

        <label>Reveal Date</label>
        <input type="datetime-local" name="reveal_at" value={form.reveal_at} onChange={handleChange} />

        <label>Privacy</label>
        <select name="privacy" value={form.privacy} onChange={handleChange}>
          <option value="private">Private</option>
          <option value="public">Public</option>
          <option value="unlisted">Unlisted</option>
        </select>

        <label>Media Type</label>
        <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
        </select>

        <input type="file" accept={mediaType + '/*'} onChange={e => setMedia(e.target.files[0])} />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Capsule'}
        </button>
      </form>
    </div>
  );
}