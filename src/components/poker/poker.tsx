"use client";

import React, { useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/navigation";

import { streamGame, streamPlayers } from "@/services/games";
import { getCurrentPlayerId } from "@/services/players";
import { Game } from "@/types/game";
import { Player } from "@/types/player";

import { GameArea } from "./game-area/game-area";
import { PokerProps } from "./poker.types";

export interface PokerPageQuery extends ParsedUrlQuery {
  id: string;
}

export const Poker = ({ id }: PokerProps) => {
  const router = useRouter();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    let effectCleanup = true;

    if (!id) {
      router.push("/");
      return;
    }

    if (effectCleanup) {
      const currentPlayerId = getCurrentPlayerId(id);
      
      if (!currentPlayerId) {
        router.push(`/join/${id}`);
      }

      setCurrentPlayerId(currentPlayerId);
      setIsLoading(true);
    }

    streamGame(id).onSnapshot((snapshot) => {
      if (effectCleanup) {
        if (snapshot.exists) {
          const data = snapshot.data();
          if (data) {
            setGame(data as Game);
            setIsLoading(false);
            return;
          }
        }
        setIsLoading(false);
      }
    });

    streamPlayers(id).onSnapshot((snapshot) => {
      if (effectCleanup) {
        const players: Player[] = [];
        snapshot.forEach((snapshot) => {
          players.push(snapshot.data() as Player);
        });
        const currentPlayerId = getCurrentPlayerId(id);

        if (!players.find((player) => player.id === currentPlayerId)) {
          router.push(`/join/${id}`);
        }
        setPlayers(players);
      }
    });

    return () => {
      effectCleanup = false;
    };
  }, [id, router]);

  if (loading) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      {game && players && currentPlayerId ? (
        <GameArea
          game={game}
          players={players}
          currentPlayerId={currentPlayerId}
        />
      ) : (
        <p>Game not found</p>
      )}
    </>
  );
};

export default Poker;
