const colors = [
  '#f87171', // red
  '#fbbf24', // yellow
  '#34d399', // green
  '#60a5fa', // blue
  '#a78bfa', // purple
  '#f472b6', // pink
  '#f2f2f2', // gray
];

export default function ColorPicker({ selected, onChange }) {
  return (
    <div className="color-picker">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={`color-swatch ${selected === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
}