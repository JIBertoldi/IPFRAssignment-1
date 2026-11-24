import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  X: { name: 'Player 1', image: null, stats: { wins: 0, draws: 0 } },
  O: { name: 'Player 2', image: null, stats: { wins: 0, draws: 0 } }
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = {
        ...players[firstSquareSymbol],
        symbol: firstSquareSymbol
      };
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    const currentPlayer = deriveActivePlayer(gameTurns);

    const updatedTurns = [
      { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ...gameTurns,
    ];

    const updatedBoard = deriveGameBoard(updatedTurns);
    const gameWinner = deriveWinner(updatedBoard, players);

    if (gameWinner) {
      updatePlayerStats(gameWinner.symbol, 'wins');
    } else if (updatedTurns.length === 9) {
      updatePlayerStats('X', 'draws');
      updatePlayerStats('O', 'draws');
    }

    setGameTurns(updatedTurns);
  }


  function updatePlayerStats(symbol, statType) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: {
          ...prevPlayers[symbol],
          stats: {
            ...prevPlayers[symbol].stats,
            [statType]: prevPlayers[symbol].stats[statType] + 1
          }
        }
      };
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: {
          ...prevPlayers[symbol],
          name: newName
        }
      };
    });
  }

  function handlePlayerImageChange(symbol, event) {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith('image/')) return;

    const image = URL.createObjectURL(file);

    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: {
          ...prevPlayers[symbol],
          image
        }
      };
    });
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X.name}
            image={players.X.image}
            stats={players.X.stats}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
            onImageChange={handlePlayerImageChange}
          />

          <Player
            initialName={players.O.name}
            image={players.O.image}
            stats={players.O.stats}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
            onImageChange={handlePlayerImageChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
