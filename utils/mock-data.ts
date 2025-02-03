export interface TvlStrategiesETH {
  EIGEN: number;
  stETH: number;
  wBETH: number;
  sfrxETH: number;
  ETHx: number;
  OETH: number;
  cbETH: number;
  osETH: number;
  swETH: number;
  ankrETH: number;
  rETH: number;
  mETH: number;
  lsETH: number;
  reALT: number;
}

interface CuratedMetadata {
  avsAddress: string;
  metadataDescription: string;
  metadataLogo: string;
  metadataDiscord: string | null;
  metadataTelegram: string | null;
  metadataWebsite: string;
  metadataX: string;
  metadataGithub: string | null;
  metadataTokenAddress: string | null;
  tags: string[];
}

export interface AVSData {
  id: number;
  name: string;
  openSource: boolean;
  decentralized: boolean;
  totalStakers: number;
  totalOperators: number;
  maxApy: string;
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
  curatedMetadata: CuratedMetadata;
  tvlStrategiesEth: TvlStrategiesETH;
}

export const mockData: AVSData[] = [
  {
    id: 1,
    name: "EigenDA",
    slashing: "Low",
    totalStakers: 77684,
    totalOperators: 201,
    maxApy: "0.8322",
    rewards: "High",
    openSource: true,
    decentralized: true,
    protocolInteroperability: ["18+ Different DA consumers "],
    riskScore: {
      slashing: 0,
      rewards: 100,
      openSource: 100,
      decentralized: 50,
      interoperability: 100,
    },
    curatedMetadata: {
      avsAddress: "0x870679e138bcdf293b7ff14dd44b70fc97e12fc0",
      metadataDescription:
        "EigenDA is a data availability layer empowering rollups with cost-efficient, hyperscale-throughput data availability, with shared cryptoeconomic security provided by EigenLayer restakers.",
      metadataDiscord: "https://discord.com/invite/eigenlayer",
      metadataLogo:
        "https://eigen-exlorer-avs.nyc3.cdn.digitaloceanspaces.com/eigen-da.png",
      metadataTelegram: null,
      metadataWebsite: "https://www.eigenda.xyz/",
      metadataX: "https://twitter.com/eigen_da",
      metadataGithub: null,
      metadataTokenAddress: null,
      tags: ["DA"],
    },
    tvlStrategiesEth: {
      EIGEN: 362439394.61163676,
      stETH: 928467.828503891,
      swETH: 17924.568420825013,
      ankrETH: 659.1693881407592,
      rETH: 14549.73551494748,
      mETH: 173458.9871279119,
      cbETH: 4337.910319165138,
      osETH: 16947.139125672333,
      wBETH: 24457.72834231025,
      sfrxETH: 9195.148706559346,
      ETHx: 79312.40678964104,
      OETH: 5129.683101449806,
      lsETH: 8289.028013246694,
      reALT: 2955443.512447242,
    },
  },
];
