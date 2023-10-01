import React from "react";
import { Club, Play, PlusCircle, Menu } from "lucide-react";
import NextLink from "next/link";

export const Header = () => {
  return (
    <nav>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="bg-slate-900 h-px bottom-0 inset-x-0 absolute" />
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <Menu />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center gap-1">
              <Club />
              Scrum Poker Cards
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NextLink href="/" className="flex items-center">
                  <PlusCircle className="mr-1" />
                  New session
                </NextLink>
                <NextLink href="/join" className="flex items-center">
                  <Play className="mr-1" />
                  Join Session
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NextLink href="/" className="flex items-center">
            <PlusCircle className="mr-1" />
            New session
          </NextLink>
          <NextLink href="/join" className="flex items-center">
            <Play className="mr-1" />
            Join Session
          </NextLink>
        </div>
      </div>
    </nav>
  );
};
