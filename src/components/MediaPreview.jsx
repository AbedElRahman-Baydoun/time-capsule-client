export default function MediaPreview({ file, type }) {
  if (!file) return null;

  const url = URL.createObjectURL(file);

  return (
    <div className="media-preview">
      {type === 'image' && <img src={url} alt="Preview" />}
      {type === 'audio' && <audio controls src={url} />}
      {type === 'text' && <p>Text file selected: {file.name}</p>}
    </div>
  );
}