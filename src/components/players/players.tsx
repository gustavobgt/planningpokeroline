import React from "react";

import { Player } from "@/types/player";

import { PlayerCard } from "./player-card/player-card";
import { PlayersProps } from "./player.types";

export const Players = (props: PlayersProps) => {
  const { game, players, currentPlayerId } = props;

  return (
      <div className="flex p-5 justify-center gap-4">
        {players.map((player: Player) => (
          <PlayerCard
            key={player.id}
            game={game}
            player={player}
            currentPlayerId={currentPlayerId}
          />
        ))}
      </div>
  );
};
