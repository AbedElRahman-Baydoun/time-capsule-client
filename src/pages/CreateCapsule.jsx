import { useState } from 'react';
import { createCapsule } from '../services/capsuleService';
import { useNavigate } from 'react-router-dom';
import MediaPreview from '../components/MediaPreview';
import MoodPicker from '../components/MoodPicker';
import ColorPicker from '../components/ColorPicker';

export default function CreateCapsule() {
  const [form, setForm] = useState({
    title: '',
    message: '',
    mood: 'happy',
    emoji: '📦',
    color: '#f2f2f2',
    reveal_at: '',
    privacy: 'private',
    surprise_mode: false,
  });

  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('text');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
        <ColorPicker
          selected={form.color}
          onChange={(value) => setForm(prev => ({ ...prev, color: value }))}
        />

        <label>Mood</label>
        <MoodPicker
          selected={form.mood}
          onChange={value => setForm(prev => ({ ...prev, mood: value }))}
        />

        <label>Reveal Date</label>
        <input type="datetime-local" name="reveal_at" value={form.reveal_at} onChange={handleChange} />

        <label>Privacy</label>
        <select name="privacy" value={form.privacy} onChange={handleChange}>
          <option value="private">Private</option>
          <option value="public">Public</option>
          <option value="unlisted">Unlisted</option>
        </select>

        <label>Surprise Mode</label>
        <input
          type="checkbox"
          name="surprise_mode"
          checked={form.surprise_mode}
          onChange={handleChange}
        />
        <span style={{ fontSize: '14px', marginLeft: '8px' }}>
          Hide countdown and reveal time
        </span>

        <label>Media Type</label>
        <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
        </select>

        <input type="file" accept={mediaType + '/*'} onChange={e => setMedia(e.target.files[0])} />
        <MediaPreview file={media} type={mediaType} />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Capsule'}
        </button>
      </form>
    </div>
  );
}