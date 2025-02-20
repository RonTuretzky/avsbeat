"use client";

import Image from "next/image";

import { AVSSocialIcons } from "./avs-social-icons";
import { ScoreWheel } from "./score-wheel";
import { ReactNode } from "react";
import { AVSData } from "@/utils/types";
import { Badge } from "./ui/badge";
import { formatValue } from "@/lib/utils";

export function AVSList({ data }: { data: AVSData[] }) {
  return (
    <section className="md:hidden">
      {data.map((avs) => {
        return (
          <article
            key={`avs_item_${avs.address}`}
            className="grid grid-cols-1 gap-4 rounded-lg border border-[#F2F2F2] bg-white px-5 py-6"
          >
            <Image
              src={avs.metadataLogo}
              alt={`${avs.metadataName} logo`}
              width={40}
              height={40}
            />
            <h2 className="font-bold text-black">{avs.metadataName}</h2>
            <AVSSocialIcons
              xLink={avs.curatedMetadata.metadataX}
              discordLink={avs.curatedMetadata.metadataDiscord}
              githubLink={avs.curatedMetadata.metadataGithub}
              websiteLink={avs.curatedMetadata.metadataWebsite}
            />
            <p className="text-foreground">
              {avs.curatedMetadata.metadataDescription}
            </p>
            <div className="flex justify-center py-6">
              <div className="size-52">
                <ScoreWheel
                  isLabeled
                  decent={avs.riskScore.decentralized}
                  slashing={avs.riskScore.slashing}
                  interop={avs.riskScore.interoperability}
                  os={avs.riskScore.openSource}
                  rewards={avs.riskScore.rewards}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-[repeat(7,1fr)] gap-y-3">
              <GridLabel>Rewards</GridLabel>
              <GridValue>{avs.riskScore.rewards}</GridValue>

              <GridLabel>Decentralisation</GridLabel>
              <GridValue>{avs.riskScore.decentralized}</GridValue>

              <GridLabel>Source Code</GridLabel>
              <GridValue>{avs.riskScore.openSource}</GridValue>

              <GridLabel>Slashing</GridLabel>
              <GridValue>{avs.riskScore.slashing}</GridValue>

              <GridLabel>Stakers</GridLabel>
              <GridValue>{formatValue(avs.totalStakers)}</GridValue>

              <GridLabel>Operators</GridLabel>
              <GridValue>{formatValue(avs.totalOperators)}</GridValue>

              <GridLabel>Category</GridLabel>
              <GridValue>
                {" "}
                {avs.curatedMetadata.tags?.map((tag: string) => (
                  <Badge>{tag}</Badge>
                ))}
              </GridValue>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function GridLabel({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center text-sm font-medium">{children}</span>
  );
}

function GridValue({ children }: { children: ReactNode }) {
  return <span className="text-right text-black">{children}</span>;
}

function getRiskString(val: number) {
  if (val < 33) return "Low";
  if (val < 66) return "Medium";
  return "High";
}
