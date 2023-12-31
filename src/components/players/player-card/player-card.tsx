import React from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { UserX } from "lucide-react";

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
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { PlayerCardProps } from "./player-card.types";

export const PlayerCard = (props: PlayerCardProps) => {
  const { game, player, currentPlayerId } = props;

  const removeUser = (gameId: string, playerId: string) => {
    removePlayer(gameId, playerId);
  };

  const hasModeratorControl =
    isModerator(game.createdById, currentPlayerId) &&
    player.id !== currentPlayerId;

  return (
    <Card className="px-3 h-[220px] relative min-w-[150px]">
      <CardHeader>
        <Badge
          variant="outline"
          className="text-center justify-center break-words w-[100px]"
        >
          {player.name}
        </Badge>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-6xl pt-2">
        <h2>{getCardValue(player, game)}</h2>
      </CardContent>
      {hasModeratorControl && (
        <Button
          onClick={() => removeUser(game.id, player.id)}
          className="absolute top-[-12px] right-[-12px] rounded-full"
          size="icon"
        >
          <UserX className="h-4 w-4" />
        </Button>
      )}
    </Card>
  );
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
