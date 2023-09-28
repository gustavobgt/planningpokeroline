import { Poker } from "@/components/poker/poker";
import { PokerProps } from "@/components/poker/poker.types";

export default function GamePage({ params }: { params: PokerProps }) {
  return (
    <main>
      <Poker id={params.id}/>
    </main>
  );
}
