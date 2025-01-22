import React from "react";

function Card({ card }) {
  return (
    <div className="card">
      {card.value}
      {card.suit}
    </div>
  );
}

export default Card;
