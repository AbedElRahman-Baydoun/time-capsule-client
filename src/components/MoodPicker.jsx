const moods = [
  { label: 'Happy', value: 'happy', emoji: '😊' },
  { label: 'Sad', value: 'sad', emoji: '😢' },
  { label: 'Excited', value: 'excited', emoji: '🤩' },
  { label: 'Nostalgic', value: 'nostalgic', emoji: '🕰' },
  { label: 'Angry', value: 'angry', emoji: '😡' },
  { label: 'Grateful', value: 'grateful', emoji: '🙏' },
];

export default function MoodPicker({ selected, onChange }) {
  return (
    <div className="mood-picker">
      {moods.map(mood => (
        <button
          key={mood.value}
          type="button"
          className={`mood-btn ${selected === mood.value ? 'active' : ''}`}
          onClick={() => onChange(mood.value)}
        >
          <span>{mood.emoji}</span>
          <small>{mood.label}</small>
        </button>
      ))}
    </div>
  );
}