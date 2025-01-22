import React, { useState } from "react";
import Player from "./Player";
import Score from "./Score";

const suits = ["♥", "♦", "♣", "♠"];
const values = [
  "K",
  "Q",
  "J",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "A",
];

function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

function Game() {
  const [deck, setDeck] = useState(createDeck());
  const [playerHand, setPlayerHand] = useState(deck.slice(7, 14));
  const [botHand, setBotHand] = useState(deck.slice(0, 7));
  const [botScore, setBotScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [log, setLog] = useState([]);
  const [lastPlayed, setLastPlayed] = useState(null);

  const playRound = (playerCardIndex) => {
    if (playerHand.length === 0 || botHand.length === 0) {
      return;
    }
    const botCard = botHand[0];
    const playerCard = playerHand[playerCardIndex];
    const updatedBotHand = botHand.slice(1);
    const updatedPlayerHand = playerHand.filter(
      (_, index) => index !== playerCardIndex
    );
    
    const botIndex = values.indexOf(botCard.value);
    const playerIndex = values.indexOf(playerCard.value);

    let result = "Draw!";
    if (playerIndex < botIndex) {
      setPlayerScore(playerScore + 1);
      result = "Player Wins!";
    } else if (botIndex < playerIndex) {
      setBotScore(botScore + 1);
      result = "Bot Wins!";
    }

    setLog([
      ...log,
      `Player: ${playerCard.value}${playerCard.suit} vs Bot: ${botCard.value}${botCard.suit} => ${result}`,
    ]);

    setLastPlayed({ playerCard, botCard });
    setPlayerHand(updatedPlayerHand);
    setBotHand(updatedBotHand);
  };

  const resetGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    setBotHand(newDeck.slice(0, 7));
    setPlayerHand(newDeck.slice(7, 14));
    setBotScore(0);
    setPlayerScore(0);
    setLog([]);
    setLastPlayed(null);
  };

  const isGameOver = () => {
    return playerHand.length === 0 && botHand.length === 0;
  };

  const getWinner = () => {
    if (playerScore > botScore) {
      return "Player Wins!";
    } else if (botScore > playerScore) {
      return "Bot Wins!";
    } else {
      return "It's a Draw!";
    }
  };

  return (
    <div className="game">
      <div className="header">
        <h1>Card Games</h1>
      </div>
      <div className="game-content">
        {isGameOver() ? (
          <div className="game-over">
            <h2>{getWinner()}</h2>
            <br />
            <h3>
              Final Score: Player {playerScore} - Bot {botScore}
            </h3>
            <button onClick={resetGame} className="reset-button">
              New Game
            </button>
          </div>
        ) : (
          <>
            <div className="left-section">
              <Player
                hand={botHand}
                name="BOT"
                onCardSelect={() => {}}
                hideCards={true}
                score={botScore}
                isGameOver={isGameOver()}
              />
              <div className="battlefield">
                <div className="battle-log-wrapper">
                  <div className="battle">
                    <div className="card">
                      {lastPlayed
                        ? `${lastPlayed.botCard.value}${lastPlayed.botCard.suit}`
                        : ""}
                    </div>
                    <label>VS</label>
                    <div className="card">
                      {lastPlayed
                        ? `${lastPlayed.playerCard.value}${lastPlayed.playerCard.suit}`
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
              <Player
                hand={playerHand}
                name="PLAYER"
                onCardSelect={playRound}
                hideCards={false}
                score={playerScore}
                isGameOver={isGameOver()}
              />
            </div>
            <div className="right-section">
              <Score name="Bot" score={botScore} />
              <div className="log">
                <h3>Log</h3>
                <div className="logInfo">
                  {log.map((entry, index) => (
                    <p key={index}>{entry}</p>
                  ))}
                </div>
              </div>
              <Score name="Player" score={playerScore} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Game;
