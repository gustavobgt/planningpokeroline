import React from "react";

import { Players } from "@/components/players/players";
import { GameController } from "@/components/poker/game-controller/game-controller";
import { CardPicker } from "@/components/players/card-picker/card-picker";
import { GameAreaProps } from "./game-area.types";

export const GameArea = (props: GameAreaProps) => {
  const { game, players, currentPlayerId } = props;

  return (
    <>
      <div className="flex flex-col overflow-auto justify-center">
        <Players
          game={game}
          players={players}
          currentPlayerId={currentPlayerId}
        />
        <GameController game={game} currentPlayerId={currentPlayerId} />
      </div>

      <div className="flex items-center justify-center">
        <CardPicker game={game} players={players} currentPlayerId={currentPlayerId} />
      </div>
    </>
  );
};
