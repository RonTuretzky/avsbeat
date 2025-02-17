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
// import PieChart from "./pie-chart";
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
    <div className="h-screen rounded-lg border border-zinc-800 bg-zinc-950">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-zinc-400">Name</TableHead>
            <TableHead className="w-[220px] text-zinc-400">
              Risk Analysis
            </TableHead>
            <TableHead className="text-zinc-400">Rewards</TableHead>
            <TableHead className="text-zinc-400">Open Source</TableHead>
            <TableHead className="text-zinc-400">Decentralized</TableHead>
            <TableHead className="text-zinc-400">Slashing</TableHead>
            <TableHead className="text-zinc-400">Stakers</TableHead>
            <TableHead className="text-zinc-400">Operators</TableHead>
            <TableHead className="text-zinc-400">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((avs, index) => (
            <TableRow key={index} className="max-h-5">
              <TableCell>
                <div className="flex items-start justify-start gap-4">
                  <div className="min-h-10 min-w-10 rounded-full">
                    <Image
                      src={
                        avs.curatedMetadata?.metadataLogo || "/placeholder.svg"
                      }
                      alt={`${avs.name} logo`}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex min-w-[400px] flex-col">
                    <span className="mt-2 font-bold text-zinc-100">
                      {avs.name}
                    </span>

                    <div className="my-2 flex gap-2">
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
              <TableCell
                className={`${
                  avs.rewards === "High" ? "font-semibold text-green-400" : ""
                }`}
              >
                {avs.rewards}
              </TableCell>
              <TableCell>{avs.openSource ? "Yes" : "No"}</TableCell>
              <TableCell>{avs.decentralized ? "Yes" : "No"}</TableCell>
              <TableCell
                className={`${
                  avs.slashing === "High" ? "font-semibold text-green-400" : ""
                }`}
              >
                {avs.slashing}
              </TableCell>
              <TableCell>{avs.totalStakers}</TableCell>
              <TableCell>{avs.totalOperators}</TableCell>
              <TableCell>
                {avs.curatedMetadata.tags?.map((tag) => <Badge>{tag}</Badge>)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
