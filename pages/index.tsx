import { AVSList } from "@/components/avs-list";
import { AVSTable } from "@/components/avs-table";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { mockData } from "@/utils/mock-data";
import { AVSApiData, AVSData } from "@/utils/types";

export default function Page({ avsData }: { avsData: AVSData[] }) {
  if (!avsData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white md:p-8">
        <p className="text-xl">Loading AVS data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="m-auto max-w-6xl space-y-8">
        <Header />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 border-[#f5f5f5] bg-white">
            <CardContent className="p-6">
              <div className="pb-4">Total AVS Solutions</div>
              <div className="text-4xl font-bold text-black">
                {avsData.length}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* mobile */}
        <AVSList data={avsData} />
        {/* desktop */}
        <AVSTable data={avsData} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const apiKey = process.env.EIGEN_EXPLORER_API_KEY;
  if (!apiKey) {
    throw new Error("EIGEN_EXPLORER_API_KEY is not set");
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
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data.data[0]));

    const updatedData: AVSData = data.data
      .filter((avs: AVSApiData) =>
        mockData.find((entry) => entry.name === avs.metadataName),
      )
      .map((avs: AVSData) => {
        const mockEntry = mockData.find(
          (entry) => entry.name === avs.metadataName,
        )!;

        return {
          ...mockEntry,
          ...avs,
          curatedMetadata: {
            ...avs.curatedMetadata,
          },
        };
      });

    return {
      props: {
        avsData: updatedData,
      },
      revalidate: 3 * 60 * 60, // Revalidate every 3 hours
    };
  } catch (error) {
    console.error("Error fetching AVS data:", error);
    return {
      props: {
        avsData: mockData,
      },
      revalidate: 1, // Revalidate every 1 second on error
    };
  }
}
