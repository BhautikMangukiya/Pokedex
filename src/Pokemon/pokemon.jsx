import React from "react";
import "./Pokemon.css";

function Pokemon({ name, image, id }) {
  return (
    <div className="pokemon-container">
      <div className="pokemon-name">{name}</div>
      <div className="pokemon-image">
        <img src={image} />
      </div>
    </div>
  );
}

export default Pokemon;
 