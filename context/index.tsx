"use client";
import { ConfigType } from "@/types";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

const defaults: ConfigType = {
  url: "http://localhost",
  port: "5000",
  createPath: "create-videos",
  cganPath: "cgan-video",
  cvaePath: "cvae-video",
  fusedPath: "fuse-video",
};

interface AppState {
  config: ConfigType;
  setConfig: (config: ConfigType) => void;
}

export const AppStateContext = createContext<AppState | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const [storedConfig, setStoredConfig] = useState<ConfigType>(() => {
    if (typeof window !== "undefined") {
      const localStorageConfig = localStorage.getItem("config");
      if (localStorageConfig) {
        return JSON.parse(localStorageConfig);
      }
    }
    return defaults;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("config", JSON.stringify(storedConfig));
    }
  }, [storedConfig]);

  const state: AppState = {
    config: storedConfig,
    setConfig: (config: any) => {
      setStoredConfig((prevConfig) => ({ ...prevConfig, ...config }));
    },
  };

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppStateProvider");
  }
  return context;
};
