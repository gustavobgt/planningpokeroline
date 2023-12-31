import React from "react";
import { Spade } from "lucide-react";
import NextLink from "next/link";

import { MainNav } from "./components/main-nav";
import { ThemeSwitcher } from "./components/theme-switcher/theme-switcher";
//import { UserNav } from "./components/user-nav";

export const Header = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <NextLink
              href="/"
              className="font-bold flex flex-shrink-0 items-center gap-1"
            >
              <Spade />
              Scrum Poker Cards
            </NextLink>

            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitcher />
              {/*<UserNav />*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
