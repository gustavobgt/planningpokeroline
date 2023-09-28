import React from "react";

import { Players } from "@/components/players/players";
import { GameAreaProps } from "./game-area.types";


export const GameArea = (props: GameAreaProps) => {
  const { game, players, currentPlayerId } = props;
  
  return (
    <>
      <div>
        <Players
          game={game}
          players={players}
          currentPlayerId={currentPlayerId}
        />
      </div>
    </>
  );
};
