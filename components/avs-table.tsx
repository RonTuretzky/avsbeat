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
import { AVSSocialIcons } from "./avs-social-icons";
import { ScoreWheel } from "./score-wheel";
import { ScoresPopover } from "./scores-popover";
import { AVSData } from "@/utils/types";
import { formatValue } from "@/lib/utils";

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
          <TableHead className="rounded-tr-lg text-center text-zinc-400">
            Category
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((avs) => (
          <TableRow
            key={`avs_item_${avs.address}`}
            className="max-h-5 bg-white"
          >
            <TableCell className="flex justify-start">
              <div className="flex justify-start gap-4">
                <div className="min-h-8 min-w-8 rounded-full">
                  <Image
                    src={avs.metadataLogo}
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
                    websiteLink={avs.curatedMetadata.metadataWebsite}
                  />
                  <p className="text-foreground">
                    {avs.curatedMetadata.metadataDescription}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="px-8">
              <div className="size-20">
                <ScoresPopover
                  trigger={
                    <button>
                      <ScoreWheel
                        decent={avs.riskScore.decentralized}
                        slashing={avs.riskScore.slashing}
                        interop={avs.riskScore.interoperability}
                        os={avs.riskScore.openSource}
                        rewards={avs.riskScore.rewards}
                      />
                    </button>
                  }
                  isOpenSource={avs.openSource}
                  isDecentralised={avs.decentralized}
                  scores={{
                    decent: avs.riskScore.decentralized,
                    slashing: avs.riskScore.slashing,
                    interop: avs.riskScore.interoperability,
                    os: avs.riskScore.openSource,
                    rewards: avs.riskScore.rewards,
                  }}
                />
              </div>
            </TableCell>
            <TableCell className="text-black">
              {formatValue(avs.totalStakers)}
            </TableCell>
            <TableCell className="text-black">
              {formatValue(avs.totalOperators)}
            </TableCell>
            <TableCell className="text-black">
              {avs.curatedMetadata.tags?.map((tag: string) => (
                <Badge>{tag}</Badge>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
