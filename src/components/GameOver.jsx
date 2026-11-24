import Avatar from "./Avatar";

export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>

      {winner && (
        <>
          <Avatar
            active
            editable={false}
            image={winner.image}
            width={240}
            height={240}
          />
          <p>{winner.name} won!</p>
        </>
      )}

      {!winner && <p>It's a draw!</p>}

      <p>
        <button onClick={onRestart} >Rematch!</button>
      </p>
    </div>
  );
}