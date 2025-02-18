export type AVSData = AVSApiData & AVSMockData;

export type AVSApiData = {
  address: string;
  metadataName: string;
  metadataDescription: string;
  metadataDiscord: string;
  metadataLogo: string;
  metadataTelegram: string;
  metadataWebsite: string;
  metadataX: string;
  totalStakers: number;
  totalOperators: number;
  maxApy: string;
  createdAtBlock: number;
  updatedAtBlock: number;
  createdAt: string;
  updatedAt: string;
  curatedMetadata: {
    avsAddress?: string;
    metadataName?: string;
    metadataDescription?: string;
    metadataDiscord?: string;
    metadataLogo?: string;
    metadataTelegram?: string;
    metadataWebsite?: string;
    metadataX?: string;
    metadataGithub?: string;
    metadataTokenAddress?: string;
    tags: Array<string>;
    isVisible: boolean;
    isVerified: boolean;
  };
};

export type AVSMockData = {
  name: string;
  openSource: boolean;
  decentralized: boolean;
  slashing: string;
  rewards: string;
  protocolInteroperability: string[];
  riskScore: {
    slashing: number;
    rewards: number;
    openSource: number;
    decentralized: number;
    interoperability: number;
  };
};
