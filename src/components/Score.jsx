import React from "react";

function Score({ name, score }) {
  return (
    <div className="scores">
      <h2>
        {name} score: {score}
      </h2>
    </div>
  );
}

export default Score;
