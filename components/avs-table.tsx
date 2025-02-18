"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AVSData } from "../utils/mock-data";
import { AVSSocialIcons } from "./avs-social-icons";
import { ScoreWheel } from "./score-wheel";

interface AVSTableProps {
  data: AVSData[];
}

export function AVSTable({ data }: AVSTableProps) {
  return (
    <Table className="hidden md:block">
      <TableHeader>
        <TableRow className="bg-[#ECECFF]">
          <TableHead className="rounded-tl-lg text-zinc-400">Name</TableHead>
          <TableHead className="text-center text-zinc-400">Risks</TableHead>
          <TableHead className="text-zinc-400">Stakers</TableHead>
          <TableHead className="text-zinc-400">Operators</TableHead>
          <TableHead className="rounded-tr-lg text-zinc-400">
            Category
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((avs, index) => (
          <TableRow key={index} className="max-h-5 bg-white">
            <TableCell>
              <div className="flex items-start justify-start gap-4">
                <div className="min-h-8 min-w-8 rounded-full">
                  <Image
                    src={
                      avs.curatedMetadata?.metadataLogo || "/placeholder.svg"
                    }
                    alt={`${avs.name} logo`}
                    width={40}
                    height={40}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-base font-bold text-black">
                    {avs.name}
                  </span>

                  <AVSSocialIcons
                    xLink={avs.curatedMetadata.metadataX}
                    discordLink={avs.curatedMetadata.metadataDiscord}
                    githubLink={avs.curatedMetadata.metadataGithub}
                  />
                  <p className="text-foreground">
                    {avs.curatedMetadata.metadataDescription}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="px-8">
              {/* <RiskAnalysisChart scores={avs.riskScore} hasLabels={false} /> */}
              <div className="size-20">
                <ScoreWheel
                  decent={avs.riskScore.decentralized}
                  slashing={avs.riskScore.slashing}
                  interop={avs.riskScore.interoperability}
                  os={avs.riskScore.openSource}
                  rewards={avs.riskScore.rewards}
                />
              </div>
            </TableCell>
            <TableCell className="text-black">{avs.totalStakers}</TableCell>
            <TableCell className="text-black">{avs.totalOperators}</TableCell>
            <TableCell className="text-black">
              {avs.curatedMetadata.tags?.map((tag) => <Badge>{tag}</Badge>)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
