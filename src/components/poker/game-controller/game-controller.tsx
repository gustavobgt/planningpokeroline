import {
  ExitIcon,
  EyeOpenIcon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

import React from "react";
import { useRouter } from "next/navigation";

import { finishGame, resetGame, removeGame } from "@/services/games";
import { GameType } from "@/types/game";
import { isModerator } from "@/utils/isModerator";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { GameControllerProps } from "./game-controller.types";
import { Separator } from "@/components/ui/separator";

export const GameController = ({
  game,
  currentPlayerId,
}: GameControllerProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const copyInviteLink = () => {
    const dummy = document.createElement("input");
    const url = `${window.location.origin}/join/${game.id}`;
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    toast({
      description: "Invite Link copied to clipboard!",
    });
  };

  const leaveGame = () => {
    router.push(`/`);
  };

  const handleRemoveGame = async (recentGameId: string) => {
    await removeGame(recentGameId);
    window.location.href = "/";
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        <Card>
          <CardHeader className="p-4">
            <CardTitle>{game.name}</CardTitle>
            <div className="flex gap-2">
              <span> {game.gameStatus}</span>
              {game.gameType !== GameType.TShirt && (
                <>
                  |<span>Average:</span>
                  <span>{game.average || 0}</span>
                </>
              )}
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="flex gap-5 p-4">
            {isModerator(game.createdById, currentPlayerId) && (
              <>
                <div className="flex justify-center flex-col text-center">
                  <div>
                    <Button
                      onClick={() => finishGame(game.id)}
                      data-testid="reveal-button"
                      variant="outline"
                      size="icon"
                    >
                      <EyeOpenIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-xs mt-1">Reveal</span>
                </div>

                <div className="flex justify-center flex-col text-center">
                  <div>
                    <Button
                      data-testid="restart-button"
                      onClick={() => resetGame(game.id)}
                      variant="outline"
                      size="icon"
                    >
                      <ResetIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-xs mt-1">Restart</span>
                </div>

                <div className="flex justify-center flex-col text-center">
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          data-testid="restart-button"
                          variant="outline"
                          size="icon"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Remove this session</DialogTitle>
                          <DialogDescription>
                            Are you sure? This will delete this session and
                            remove all players.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={() => handleRemoveGame(game.id)}
                          >
                            CONFIRM
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <span className="text-xs mt-1">Delete</span>
                </div>
              </>
            )}

            <div className="flex justify-center flex-col text-center">
              <div>
                <Button
                  data-testid="exit-button"
                  onClick={() => leaveGame()}
                  variant="outline"
                  size="icon"
                >
                  <ExitIcon className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-xs mt-1">Exit</span>
            </div>

            <div
              title="Copy invite link"
              className="flex justify-center flex-col text-center"
            >
              <div>
                <Button
                  data-testid="invite-button"
                  onClick={() => copyInviteLink()}
                  variant="outline"
                  size="icon"
                >
                  <ExitIcon className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-xs mt-1">Invite</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
