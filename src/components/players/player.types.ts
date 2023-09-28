import { Game } from "@/types/game";
import { Player } from "@/types/player";

export interface PlayersProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}
