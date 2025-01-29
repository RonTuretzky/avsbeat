export interface AVSData {
  id: number
  name: string
  logo: string
  slashing: string
  rewards: string
  openSource: boolean
  decentralized: boolean
  protocolInteroperability: string[]
  riskScore: {
    slashing: number
    rewards: number
    openSource: number
    decentralized: number
    interoperability: number
  }
}

export const mockData: AVSData[] = [
  {
    id: 1,
    name: "EigenDA",
    logo: "/placeholder.svg?height=32&width=32",
    slashing: "Low",
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
  },
  {
    id: 2,
    name: "eoracle",
    logo: "/placeholder.svg?height=32&width=32",
    slashing: "Low",
    rewards: "Low",
    openSource: false,
    decentralized: false,
    protocolInteroperability: ["Any EVM"],
    riskScore: {
      slashing: 0,
      rewards: 0,
      openSource: 30,
      decentralized: 20,
      interoperability: 80,
    },
  },
  {
    id: 3,
    name: "Witness Chain",
    logo: "/placeholder.svg?height=32&width=32",
    slashing: "Low",
    rewards: "Low",
    openSource: true,
    decentralized: false,
    protocolInteroperability: ["Ethereum"],
    riskScore: {
      slashing: 0,
      rewards: 0,
      openSource: 20,
      decentralized: 0,
      interoperability: 0,
    },
  },
  {
    id: 4,
    name: "Alt Layer",
    logo: "/placeholder.svg?height=32&width=32",
    slashing: "Low",
    rewards: "Low",
    openSource: false,
    decentralized: false,
    protocolInteroperability: ["Multiple rollup types supported"],
    riskScore: {
      slashing: 0,
      rewards: 0,
      openSource: 20,
      decentralized: 0,
      interoperability: 80,
    },
  },
  {
    id: 5,
    name: "Hyperlane AVS",
    logo: "/placeholder.svg?height=32&width=32",
    slashing: "Low",
    rewards: "Low",
    openSource: false,
    decentralized: false,
    protocolInteroperability: ["deployed on more than 35 EVM, Cosmos, and Sealevel chains"],
    riskScore: {
      slashing: 0,
      rewards: 0,
      openSource: 20,
      decentralized: 0,
      interoperability: 80,
    },
  },
]

