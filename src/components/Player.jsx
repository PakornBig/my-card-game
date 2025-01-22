import React from "react";
import Card from "./Card";
import imgcard from "../../public/card.png";

function Player({ hand, onCardSelect, hideCards}) {
  return (
    <div className="player">
      <div className="hand">
        {hand.map((card, index) => (
          <div
            key={index}
            onClick={!hideCards ? () => onCardSelect(index) : undefined}
            style={{ cursor: hideCards ? "default" : "pointer" }}
          >
            {hideCards ? (
              <div className="card-back">
                <img id="img-card" src={imgcard} alt="img-card" />
              </div>
            ) : (
              <Card card={card} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Player;
