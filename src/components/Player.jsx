import { useState } from 'react';
import Avatar from './Avatar';

export default function Player({
  initialName,
  image,
  stats,
  symbol,
  isActive,
  onChangeName,
  onImageChange,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = 'Edit';

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    // btnCaption = 'Save';
  }

  return (
    <li
      className={isActive ? 'active' : undefined}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' , borderRadius: '0.5rem' }}
    >
      <Avatar
        active={isActive}
        image={image}
        stats={stats}
        onImageChange={(event) => onImageChange(symbol, event)}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </div>
    </li>
  );
}
