"use client";

import Image from "next/image";

import type { AVSData } from "../utils/mock-data";

import { AVSSocialIcons } from "./avs-social-icons";
import { ScoreWheel } from "./score-wheel";
import { ReactNode } from "react";

export function AVSList({ data }: { data: AVSData[] }) {
  return (
    <section className="md:hidden">
      {data.map((avs) => (
        <article
          key={`avs_item_${avs.id}`}
          className="grid grid-cols-1 gap-4 rounded-lg border border-[#F2F2F2] bg-white px-5 py-6"
        >
          <Image
            src={avs.curatedMetadata?.metadataLogo || "/placeholder.svg"}
            alt={`${avs.name} logo`}
            width={40}
            height={40}
          />
          <h2 className="font-bold text-black">{avs.name}</h2>
          <AVSSocialIcons
            xLink={avs.curatedMetadata.metadataX}
            discordLink={avs.curatedMetadata.metadataDiscord}
            githubLink={avs.curatedMetadata.metadataGithub}
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
          <div className="grid grid-cols-2 gap-y-3">
            <GridLabel>Rewards</GridLabel>
            <GridValue>???</GridValue>

            <GridLabel>Decentralisation</GridLabel>
            <GridValue>???</GridValue>

            <GridLabel>Source Code</GridLabel>
            <GridValue>???</GridValue>

            <GridLabel>Slashing</GridLabel>
            <GridValue>???</GridValue>

            <GridLabel>Stakers</GridLabel>
            <GridValue>???</GridValue>

            <GridLabel>Operators</GridLabel>
            <GridValue>???</GridValue>
          </div>
        </article>
      ))}
    </section>
  );
}

function GridLabel({ children }: { children: ReactNode }) {
  return <span className="text-sm font-medium">{children}</span>;
}

function GridValue({ children }: { children: ReactNode }) {
  return <span className="text-right text-black">{children}</span>;
}
