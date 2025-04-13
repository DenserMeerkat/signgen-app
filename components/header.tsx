import React from "react";
import { ModeToggle } from "./header/mode-toggle";
import SettingsDialog from "./header/config-dialog";

const Header = () => {
  return (
    <header className="bg-secondary-background border-b-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="bg-main text-main-foreground rounded-lg border-2 p-1 text-xl font-bold">
          SG
        </div>
        <div className="flex items-center space-x-2">
          <SettingsDialog />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
