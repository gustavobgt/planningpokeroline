import React, { useEffect, useState } from "react";

import { updatePlayerValue } from "@/services/players";
import { Game } from "@/types/game";
import { Player } from "@/types/player";
import { Status } from "@/types/status";
import { Card } from "@/components/ui/card";

import { CardConfig, getCards, getRandomEmoji } from "./card-configs";
import { CardPickerProps } from "./card-picker.types";

export const CardPicker = ({
  game,
  players,
  currentPlayerId,
}: CardPickerProps) => {
  const [randomEmoji, setRandomEmoji] = useState(getRandomEmoji);
  const playPlayer = (gameId: string, playerId: string, card: CardConfig) => {
    if (game.gameStatus !== Status.Finished) {
      updatePlayerValue(gameId, playerId, card.value, randomEmoji);
    }
  };
  const cards = getCards(game.gameType);

  useEffect(() => {
    if (game.gameStatus === Status.Started) {
      setRandomEmoji(getRandomEmoji);
    }
  }, [game.gameStatus]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <div className="flex gap-4 justify-center flex-wrap">
          {cards.map((card: CardConfig) => (
            <Card
              key={card.value}
              id={`card-${card.displayValue}`}
              onClick={() => playPlayer(game.id, currentPlayerId, card)}
              style={{
                ...getCardStyle(players, currentPlayerId, card),
                pointerEvents: getPointerEvent(game),
                cursor: "pointer",
              }}
              className="transform transition-all hover:translate-y-[-10px]"
            >
              <div className="flex flex-col items-center justify-between min-h-[120px] min-w-[100px] p-2">
                {card.value >= 0 && (
                  <>
                    <span className="self-stretch text-left text-xs">
                      {card.displayValue}
                    </span>
                    <h4 className="text-2xl font-medium">
                      {card.displayValue}
                    </h4>
                    <span className="self-stretch text-right text-xs">
                      {card.displayValue}
                    </span>
                  </>
                )}
                {card.value === -1 && (
                  <span className="text-2xl my-auto mx-0">{randomEmoji}</span>
                )}
                {card.value === -2 && (
                  <span className="text-2xl my-auto mx-0">❓</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <footer>
        {game.gameStatus !== Status.Finished
          ? "Click on the card to vote"
          : "Session not ready for Voting! Wait for moderator to start"}
      </footer>
    </div>
  );
};

const getCardStyle = (
  players: Player[],
  playerId: string,
  card: CardConfig
) => {
  const player = players.find((player) => player.id === playerId);
  if (player && player.value !== undefined && player.value === card.value) {
    return {
      transform: `translateY(-15px)`,
      //marginTop: "-15px",
      zIndex: 5,
      backgroundColor: card.color,
      border: "1px dashed black",
      boxShadow: "0 0px 10px 0 grey",
    };
  }
  return { backgroundColor: card.color };
};

const getPointerEvent = (game: Game) => {
  if (game.gameStatus === Status.Finished) {
    return "none";
  }
  return "inherit";
};
