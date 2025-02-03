// import { AVSTable } from "./components/avs-table"
// import { Card, CardContent } from "@/components/ui/card"

// interface PageProps {
//   avsData: AVSData[] | undefined
// }

// export default function Page({ avsData }: PageProps) {
//   // Add a check for undefined avsData
//   if (!avsData) {
//     return (
//       <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
//         <p className="text-xl">Loading AVS data...</p>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-black text-white p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="space-y-2">
//             <h1 className="text-3xl font-bold">AVS Analysis Dashboard</h1>
//             <p className="text-zinc-400">Compare and analyze various AVS implementations</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
//           <Card className="bg-zinc-900 border-zinc-800">
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">{avsData.length}</div>
//               <div className="text-zinc-400">Total AVS Solutions</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-zinc-900 border-zinc-800">
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">{avsData.filter((item) => item.openSource).length}</div>
//               <div className="text-zinc-400">Open Source</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-zinc-900 border-zinc-800">
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">{avsData.filter((item) => item.decentralized).length}</div>
//               <div className="text-zinc-400">Decentralized</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-zinc-900 border-zinc-800">
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">
//                 {Array.from(new Set(avsData.flatMap((item) => item.protocolInteroperability))).length}
//               </div>
//               <div className="text-zinc-400">Interoperable Protocols</div>
//             </CardContent>
//           </Card>
//         </div>

//         <AVSTable data={avsData} />
//       </div>
//     </div>
//   )
// }

// export async function getStaticProps() {
//   try {
//     const apiKey = process.env.EIGEN_EXPLORER_API_KEY
//     if (!apiKey) {
//       throw new Error("EIGEN_EXPLORER_API_KEY is not set")
//     }
//     console.log(apiKey)

//     const response = await fetch(
//       "https://api.eigenexplorer.com/avs?take=1&withTvl=true&withRewards=true&withCuratedMetadata=true&sortByTotalStakers=desc",
//       {
//         headers: {
//           ['X-API-Token']: `${apiKey}`,
//         },
//       },
//     )
//     console.log(response)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     const data = await response.json()

//     const avsData: AVSData[] = data.data.map((avs: any, index: number) => ({
//       id: index + 1,
//       name: avs.metadataName,
//       logo: avs.metadataLogo || "/placeholder.svg?height=32&width=32"
//     }))

//     return {
//       props: {
//         avsData,
//       },
//       revalidate: 24 * 60 * 60, // Revalidate every 24 hours
//     }
//   } catch (error) {
//     console.error("Error fetching AVS data:", error)
//     return {
//       props: {
//         avsData: [], // Return an empty array instead of undefined
//       },
//       revalidate: 60, // Retry after 1 minute if there was an error
//     }
//   }
// }

