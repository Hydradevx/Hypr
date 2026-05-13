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
  };
}