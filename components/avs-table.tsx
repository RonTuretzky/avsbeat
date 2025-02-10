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
import { RiskAnalysisChart } from "./risk-analysis-chart";
import type { AVSData } from "../utils/mock-data";
import PieChart from "./pie-chart";
import Discord from "../public/discord.png";
import Github from "../public/github.png";
import Twitter from "../public/x.png";
import Telegram from "../public/telegram.png";
import WebSite from "../public/www.png";

interface AVSTableProps {
  data: AVSData[];
}

export function AVSTable({ data }: AVSTableProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-zinc-400">Name</TableHead>
            <TableHead className="text-zinc-400 w-[220px]">
              Risk Analysis
            </TableHead>
            <TableHead className="text-zinc-400">Status</TableHead>
            <TableHead className="text-zinc-400">Description</TableHead>
            <TableHead className="text-zinc-400">Total Stakers</TableHead>
            <TableHead className="text-zinc-400">Total Operators</TableHead>
            <TableHead className="text-zinc-400">Tags</TableHead>
            <TableHead className="text-zinc-400">TVL Strategies ETH</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((avs, index) => (
            <TableRow key={index} className="">
              <TableCell>
                <div className="flex gap-4 justify-start items-start">
                  <div className="min-w-10 min-h-10 rounded-full">
                    <Image
                      src={
                        avs.curatedMetadata?.metadataLogo || "/placeholder.svg"
                      }
                      alt={`${avs.name} logo`}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex flex-col min-w-[400px]">
                    <span className="text-zinc-100 mt-2 font-bold">
                      {avs.name}
                    </span>

                    <div className="flex gap-2 my-2">
                      <a href={avs.curatedMetadata.metadataDiscord || ""}>
                        <Image
                          src={Discord}
                          alt="discord-icon"
                          width={20}
                          height={20}
                        />
                      </a>
                      <a href={avs.curatedMetadata.metadataTelegram || ""}>
                        <Image
                          src={Telegram}
                          alt="telegram-icon"
                          width={20}
                          height={20}
                        />
                      </a>
                      <a href={avs.curatedMetadata.metadataWebsite || ""}>
                        <Image
                          src={WebSite}
                          alt="website-icon"
                          width={20}
                          height={20}
                        />
                      </a>
                      <a href={avs.curatedMetadata.metadataX || ""}>
                        <Image
                          src={Twitter}
                          alt="x-icon"
                          width={20}
                          height={20}
                        />
                      </a>
                      <a href={avs.curatedMetadata.metadataGithub || ""}>
                        <Image
                          src={Github}
                          alt="github-icon"
                          width={20}
                          height={20}
                        />
                      </a>
                    </div>
                    <p className="">
                      {avs.curatedMetadata.metadataDescription}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-8">
                <RiskAnalysisChart scores={avs.riskScore} />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 text-xs">
                  <div>
                    <span className="text-zinc-400">Slashing:</span>{" "}
                    <span className="text-zinc-100">{avs.slashing}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Rewards:</span>{" "}
                    <span className="text-zinc-100">{avs.rewards}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Interoperability:</span>{" "}
                    <span className="text-zinc-100">
                      {avs.protocolInteroperability.join(", ")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <Badge
                      variant={avs.openSource ? "success" : "destructive"}
                      className="text-[10px] h-4"
                    >
                      {avs.openSource ? "Open Source" : "Closed Source"}
                    </Badge>
                    <Badge
                      variant={avs.decentralized ? "success" : "destructive"}
                      className="text-[10px] h-4"
                    >
                      {avs.decentralized ? "Decentralized" : "Centralized"}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>{avs.totalStakers}</TableCell>
              <TableCell>{avs.totalOperators}</TableCell>
              <TableCell>{avs.curatedMetadata.tags.join(", ")}</TableCell>
              <TableCell>
                <PieChart data={avs.tvlStrategiesEth} key={index} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
