
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

  let editablePlayerName = (
    <span className="player-name">{playerName}</span>
  );

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleChange}
      />
    );
  }

  return (
    <li className={`player-item ${isActive ? 'active' : ''}`}>
      <Avatar
        active={isActive}
        image={image}
        stats={stats}
        onImageChange={(event) => onImageChange(symbol, event)}
      />

      <div className="player-info">
        <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>

        <button onClick={handleEditClick}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </li>
  );
}
