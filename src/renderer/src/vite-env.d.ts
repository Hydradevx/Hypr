/// <reference types="vite/client" />

interface Window {
  hypr: {
    getBotStats: () => Promise<{
      username: string;
      servers: number;
      ping: number;
      uptime: string;
    }>;

    killBot: () => Promise<boolean>;

    getLogs: () => Promise<string[]>;

    getRPC: () => Promise<{
      details: string;
      state: string;
      largeImageKey: string;
      largeImageText: string;
      smallImageKey: string;
      smallImageText: string;
      buttons: {
        label: string;
        url: string;
      }[];
    }>;

    setRPC: (data: any) => Promise<boolean>;
  };
}