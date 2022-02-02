import React from "react";

const PlayerItem = ({ player }) => (
  <div className="player-item-conatiner">
    <div>
      {player.name}:
    </div>
    <div>
      {player.lifetime_wins}
    </div>
  </div>
);

export default PlayerItem;