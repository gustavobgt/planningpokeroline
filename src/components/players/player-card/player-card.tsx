import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";

import { Game, GameType } from "@/types/game";
import { Player } from "@/types/player";
import { Status } from "@/types/status";
import { getCards } from "@/components/players/card-picker/card-configs";

import { removePlayer } from "@/services/players";
import { isModerator } from "@/utils/isModerator";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PlayerCardProps } from "./player-card.types";
import { Button } from "@/components/ui/button";

export const PlayerCard = (props: PlayerCardProps) => {
  const { game, player, currentPlayerId } = props;

  const removeUser = (gameId: string, playerId: string) => {
    removePlayer(gameId, playerId);
  };

  const hasModeratorControl =
    isModerator(game.createdById, currentPlayerId) &&
    player.id !== currentPlayerId;

  return (
    <Card
      style={{
        backgroundColor: getCardColor(game, player.value),
      }}
    >
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-6xl pt-2">
        <h2>{getCardValue(player, game)}</h2>
      </CardContent>
      {hasModeratorControl && (
        <CardFooter>
          <Button onClick={() => removeUser(game.id, player.id)} className="w-full">
            <TrashIcon className="mr-2 h-4 w-4" /> kick
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const getCardColor = (game: Game, value: number | undefined): string => {
  if (game.gameStatus !== Status.Finished) {
    return "var(--color-background-secondary)";
  }
  const card = getCards(game.gameType).find((card) => card.value === value);
  return card ? card.color : "var(--color-background-secondary)";
};

const getCardValue = (player: Player, game: Game) => {
  if (game.gameStatus !== Status.Finished) {
    return player.status === Status.Finished ? "👍" : "🤔";
  }

  if (game.gameStatus === Status.Finished) {
    if (player.status === Status.Finished) {
      if (player.value && player.value === -1) {
        return player.emoji || "☕"; // coffee emoji
      }
      return getCardDisplayValue(game.gameType, player.value);
    }
    return "🤔";
  }
};

const getCardDisplayValue = (
  gameType: GameType | undefined,
  cardValue: number | undefined
): string | number | undefined => {
  return (
    getCards(gameType).find((card) => card.value === cardValue)?.displayValue ||
    cardValue
  );
};
