import { Game } from '@/types/game';
import { Player } from '@/types/player';

export interface CardPickerProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}
