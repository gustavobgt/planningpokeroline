"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  uniqueNamesGenerator,
  Config,
  starWars,
  colors,
  animals,
} from "unique-names-generator";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { GameType, NewGame } from "@/types/game";
import { addNewGame } from "@/services/games";

const gameNameConfig: Config = {
  dictionaries: [colors, animals],
  separator: " ",
  style: "capital",
};

const userNameConfig: Config = {
  dictionaries: [starWars],
};

export const CreateGame = () => {
  const router = useRouter();
  const [gameName, setGameName] = useState(
    uniqueNamesGenerator(gameNameConfig)
  );
  const [createdBy, setCreatedBy] = useState(
    uniqueNamesGenerator(userNameConfig)
  );
  const [gameType, setGameType] = useState(GameType.Fibonacci);
  const [hasDefaults, setHasDefaults] = useState({ game: true, name: true });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const game: NewGame = {
      name: gameName,
      createdBy: createdBy,
      gameType: gameType,
      createdAt: new Date(),
    };

    const newGameId = await addNewGame(game);

    if (newGameId) {
      setLoading(false);
    }

    router.push(`/game/${newGameId}`);
  };

  const emptyGameName = () => {
    if (hasDefaults.game) {
      setGameName("");
      hasDefaults.game = false;
      setHasDefaults(hasDefaults);
    }
  };

  const emptyCreatorName = () => {
    if (hasDefaults.name) {
      setCreatedBy("");
      hasDefaults.name = false;
      setHasDefaults(hasDefaults);
    }
  };

  return (
    <div className="flex-col flex items-center gap-8 min-h-full lg:flex-row justify-center px-6 py-12 lg:px-8">
      <div className="order-last lg:order-first flex flex-col gap-3 max-w-[500px]">
        <h1 className="text-3xl font-semibold text-center">Scrum Poker Cards</h1>

        <Image
          src="/svgs/undraw_playing_cards_cywn.svg"
          width={460.5}
          height={323.86801}
          alt=""
          priority
        />

        <p className="text-base font-medium text-left">
          Free Scrum Poker Web App to estimate user stories for
          your Agile/Scrum teams. Create a session and invite your team members
          to estimate user stories efficiently.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create new session</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Session name*
              </label>
              <div className="mt-2">
                <Input
                  id="session-name"
                  name="session-name"
                  type="text"
                  placeholder="Enter a session name"
                  value={gameName || ""}
                  onClick={() => emptyGameName()}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setGameName(event.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="your-name"
                  className="block text-sm font-medium leading-6"
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
                  value={createdBy || ""}
                  onClick={() => emptyCreatorName()}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setCreatedBy(event.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <RadioGroup
                defaultValue={GameType.Fibonacci}
                aria-label="game type"
                name="game-type"
                onValueChange={(value) => {
                  setGameType(value as GameType);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={GameType.Fibonacci}
                    id={GameType.Fibonacci}
                  />
                  <Label className="text-xs" htmlFor="r1">
                    Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={GameType.ShortFibonacci}
                    id={GameType.ShortFibonacci}
                  />
                  <Label className="text-xs" htmlFor="r2">
                    Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={GameType.TShirt}
                    id={GameType.TShirt}
                  />
                  <Label className="text-xs" htmlFor="r3">
                    T-Shirt (XXS, XS, S, M, L, XL, XXL)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center"
                disabled={loading}
              >
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
