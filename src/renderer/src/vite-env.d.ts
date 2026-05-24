/// <reference types="vite/client" />

type Config = {
  token: string;
  [key: string]: any;
};

interface Window {
  hypr: {
    getBotStats: () => Promise<>;

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

    sendCommand: (channelId: string, content: string) => Promise<boolean>;

    getServers: () => Promise<{
      id: string;
      name: string;
      channels: {
        id: string;
        name: string;
      }[];
    }[]>;


      getConfig: () => Config | null;

      saveConfig: (config: any) => Promise<boolean>;
  };
}