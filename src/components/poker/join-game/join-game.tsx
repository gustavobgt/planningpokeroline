"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getGame } from "@/services/games";
import { addPlayerToGame, isCurrentPlayerInGame } from "@/services/players";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { JoinGameProps } from "./join-game.types";
import { ToastAction } from "@/components/ui/toast";

export const JoinGame = ({ id }: JoinGameProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [joinGameId, setJoinGameId] = useState(id);
  const [playerName, setPlayerName] = useState("");
  const [gameFound, setIsGameFound] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (joinGameId) {
      const res = await addPlayerToGame(joinGameId, playerName);

      setIsGameFound(res);
      if (res) {
        router.push(`/game/${joinGameId}`);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (joinGameId) {
        if (await getGame(joinGameId)) {
          setIsGameFound(true);
          if (await isCurrentPlayerInGame(joinGameId)) {
            router.push(`/game/${joinGameId}`);
          }
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Session was deleted and doesn't exist anymore!",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setTimeout(() => {
            router.push("/");
          }, 5000);
        }
      }
    }
    fetchData();
  }, [joinGameId, router, toast]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Join a Session
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Session ID*
            </label>
            <div className="mt-2">
              <Input
                id="session-name"
                name="session-name"
                type="text"
                placeholder="xyz..."
                defaultValue={joinGameId}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setJoinGameId(event.target.value)
                }
                required
              />
            </div>
            {!gameFound && <p>Session not found, check the ID</p>}
          </div>

          <div>
            <div>
              <label
                htmlFor="your-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your name*
              </label>
            </div>
            <div className="mt-2">
              <Input
                id="your-name"
                name="your-name"
                type="text"
                autoComplete="your-name"
                required
                placeholder="Enter your name"
                defaultValue={playerName}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPlayerName(event.target.value)
                }
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center"
              disabled={loading}
            >
              Join
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
