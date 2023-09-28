import { Game } from "@/types/game";
import { Player } from "@/types/player";

export interface GameAreaProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}
