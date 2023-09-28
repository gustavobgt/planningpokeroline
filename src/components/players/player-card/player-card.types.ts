import { Game } from "@/types/game";
import { Player } from "@/types/player";

export interface PlayerCardProps {
    game: Game;
    player: Player;
    currentPlayerId: string;
  }