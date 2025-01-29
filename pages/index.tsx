import { AVSTable } from "@/components/avs-table"
import { Card, CardContent } from "@/components/ui/card"
import type { AVSData } from "@/utils/mock-data"
import { mockData } from "@/utils/mock-data"

export default function Page({ avsData }: { avsData: AVSData[] }) {
  // Add a check for undefined avsData
  if (!avsData) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
        <p className="text-xl">Loading AVS data...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">AVS Analysis Dashboard</h1>
            <p className="text-zinc-400">Compare and analyze various AVS implementations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-500">{avsData.length}</div>
              <div className="text-zinc-400">Total AVS Solutions</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-500">{avsData.filter((item) => item.openSource).length}</div>
              <div className="text-zinc-400">Open Source</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-500">{avsData.filter((item) => item.decentralized).length}</div>
              <div className="text-zinc-400">Decentralized</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-500">
                {avsData.filter((item) => item.protocolInteroperability).length}
              </div>
              <div className="text-zinc-400">Interoperable Protocols</div>
            </CardContent>
          </Card>
        </div>

        <AVSTable data={avsData} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const apiKey = process.env.EIGEN_EXPLORER_API_KEY
  if (!apiKey) {
    throw new Error("EIGEN_EXPLORER_API_KEY is not set")
  }

  try {
    const response = await fetch(
      "https://api.eigenexplorer.com/avs?take=1000&withTvl=true&withRewards=true&withCuratedMetadata=true&sortByTotalStakers=desc",
      {
        headers: {
          "X-API-Token": apiKey,
        },
        next: {
          revalidate: 24 * 60 * 60, // Revalidate every 24 hours
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    const updatedData: AVSData[] = data.data.map((avs: any) => {
      // Find matching mock entry
      const mockEntry = mockData.find((mock) => mock.name === avs.metadataName)

      if (mockEntry) {
        // If found, fuse mock data with API data
        return {
          ...mockEntry,
          name: avs.metadataName || mockEntry.name,
          logo: avs.metadataLogo || mockEntry.logo,
        }
      }

      // If no match found, create new entry with limited API data and default values
      return {
        id: mockData.length + 1, // Assign a new ID
        name: avs.metadataName,
        logo: avs.metadataLogo || "/placeholder.svg?height=32&width=32",
        slashing: "N/A",
        rewards: "N/A",
        openSource: false,
        decentralized: false,
        protocolInteroperability: [],
        riskScore: {
          slashing: 0,
          rewards: 0,
          openSource: 0,
          decentralized: 0,
          interoperability: 0,
        },
      }
    })
    // Ensure unique IDs for any new entries
    .map((item, index) => ({
      ...item,
      id: index + 1,
    }))

    return {
      props: {
        avsData: updatedData,
      },
      revalidate: 3 * 60 * 60, // Revalidate every 3 hours
    }
  } catch (error) {
    console.error("Error fetching AVS data:", error)
    return {
      props: {
        avsData: mockData,
      },
      revalidate: 1, // Revalidate every 1 second on error
    }
  }
}
