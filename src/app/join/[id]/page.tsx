import { JoinGame } from "@/components/poker/join-game/join-game";
import { JoinGameProps } from "@/components/poker/join-game/join-game.types";

export default function JoinGamePage({ params }: { params: JoinGameProps }) {
  return (
    <main>
      <JoinGame id={params.id}/>
    </main>
  );
}
