import React from "react";

import { Player } from "@/types/player";

import { PlayerCard } from "./player-card/player-card";
import { PlayersProps } from "./player.types";

export const Players = (props: PlayersProps) => {
  const { game, players, currentPlayerId } = props;

  return (
      <div className="flex pt-14 px-5 justify-center gap-4 flex-wrap">
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
