"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RiskAnalysisChart } from "./risk-analysis-chart"
import type { AVSData } from "../utils/mock-data"

interface AVSTableProps {
  data: AVSData[]
}

export function AVSTable({ data }: AVSTableProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-zinc-400 w-[100px]">#</TableHead>
            <TableHead className="text-zinc-400">Name</TableHead>
            <TableHead className="text-zinc-400 w-[220px]">Risk Analysis</TableHead>
            <TableHead className="text-zinc-400">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((avs) => (
            <TableRow key={avs.id} className="border-zinc-800">
              <TableCell className="text-zinc-300">{avs.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800">
                    <Image src={avs.logo || "/placeholder.svg"} alt={`${avs.name} logo`} width={32} height={32} />
                  </div>
                  <span className="text-zinc-100 font-medium">{avs.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <RiskAnalysisChart scores={avs.riskScore} />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 text-xs">
                  <div>
                    <span className="text-zinc-400">Slashing:</span>{" "}
                    <span className="text-zinc-100">{avs.slashing}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Rewards:</span> <span className="text-zinc-100">{avs.rewards}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Interoperability:</span>{" "}
                    <span className="text-zinc-100">{avs.protocolInteroperability.join(", ")}</span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    <Badge variant={avs.openSource ? "success" : "destructive"} className="text-[10px] h-4">
                      {avs.openSource ? "Open Source" : "Closed Source"}
                    </Badge>
                    <Badge variant={avs.decentralized ? "success" : "destructive"} className="text-[10px] h-4">
                      {avs.decentralized ? "Decentralized" : "Centralized"}
                    </Badge>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

