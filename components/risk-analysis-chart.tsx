"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  type ChartConfiguration,
  type ChartData,
  DoughnutController,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Card, CardContent } from "@/components/ui/card";

Chart.register(DoughnutController, ArcElement, Tooltip);

interface RiskAnalysisProps {
  scores: {
    slashing: number;
    rewards: number;
    openSource: number;
    decentralized: number;
    interoperability: number;
  };
}

function getColorForScore(score: number): string {
  const normalizedScore = Math.max(0, Math.min(score, 100));
  const red = Math.round(255 * (1 - normalizedScore / 100));
  const green = Math.round(255 * (normalizedScore / 100));
  return `rgb(${red}, ${green}, 0)`;
}

const labels = [
  {
    label: "Slashing",
    key: "slashing",
    position: { angle: -55, rotate: 35 },
  },
  {
    label: "Rewards",
    key: "rewards",
    position: { angle: 17, rotate: -75 },
  },
  {
    label: "Open Source",
    key: "openSource",
    position: { angle: 90, rotate: 0 },
  },
  {
    label: "Decentralized",
    key: "decentralized",
    position: { angle: 160, rotate: -110 },
  },
  {
    label: "Interoperability",
    key: "interoperability",
    position: { angle: -130, rotate: 140 },
  },
];

export function RiskAnalysisChart({ scores }: RiskAnalysisProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const data: ChartData = {
          labels: labels.map(({ label }) => label),
          datasets: [
            {
              data: [1, 1, 1, 1, 1], // Keep equal parts for 5 constant sections
              backgroundColor: (context) => {
                const value =
                  scores[labels[context.dataIndex].key as keyof typeof scores];
                return getColorForScore(value);
              },
              borderColor: "#000000",
              borderWidth: 8,
              borderRadius: 0,
            },
          ],
        };

        const config: ChartConfiguration = {
          type: "doughnut",
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: (context) => {
                    const label = context.label || "";
                    const value =
                      scores[
                        labels[context.dataIndex].key as keyof typeof scores
                      ];
                    return `${label}: ${value}`;
                  },
                },
              },
            },
            cutout: "20%",
            rotation: 0,
            circumference: 360,
          },
        };

        const chart = new Chart(ctx, config);

        // Add labels around the circle
        if (containerRef.current) {
          const container = containerRef.current;
          container
            .querySelectorAll(".chart-label")
            .forEach((el) => el.remove());

          labels.forEach(({ label, position: { angle, rotate } }) => {
            const radian = (angle * Math.PI) / 180;
            const radius = Math.min(chart.width, chart.height) / 2;
            const labelRadius = radius * 1.07; // Increased distance between labels and chart

            const x = chart.width / 2 + labelRadius * Math.cos(radian);
            const y = chart.height / 2 + labelRadius * Math.sin(radian);

            const labelEl = document.createElement("div");
            labelEl.className =
              "chart-label absolute text-xs font-medium text-zinc-400 whitespace-nowrap text-center";
            labelEl.style.left = `${x}px`;
            labelEl.style.top = `${y}px`;

            // Rotate text to follow the circle
            let rotation = rotate !== undefined ? rotate : angle;
            if (angle > 90 || angle < -90) {
              rotation += 180;
            }

            labelEl.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            labelEl.textContent = label;

            container.appendChild(labelEl);
          });
        }

        return () => {
          chart.destroy();
          if (containerRef.current) {
            containerRef.current
              .querySelectorAll(".chart-label")
              .forEach((el) => el.remove());
          }
        };
      }
    }
  }, [scores]);

  return (
    <Card className="bg-black border-black" style={{ zIndex: 9999 }}>
      <CardContent className="flex p-4 gap-12 items-center justify-cente">
        <div ref={containerRef} className="relative w-[200px] h-[200px] mx-4">
          <canvas ref={chartRef} className="" />
        </div>
        <div className="text-white min-w-[150px]">
          <div className="flex flex-col gap-1 p-1">
            <p>Decentralized</p>
            <p>
              {scores?.decentralized <= 0 ? (
                <p className="text-red-400">
                  Centralized ({scores?.decentralized})
                </p>
              ) : (
                <p className="text-green-400">
                  Decentralized ({scores?.decentralized})
                </p>
              )}
            </p>
          </div>
          <div className="flex flex-col gap-1 p-1">
            <p>Slashing</p>
            <p>
              {scores?.slashing < 25 ? (
                <p className="text-red-400">Low ({scores?.slashing})</p>
              ) : scores?.slashing < 50 ? (
                <p className="text-orange-400">Medium ({scores?.slashing})</p>
              ) : (
                <p className="text-green-400">High ({scores?.slashing})</p>
              )}
            </p>
          </div>
          <div className="flex flex-col gap-1 p-1">
            <p>Interoperatability</p>
            <p>
              {scores?.interoperability < 25 ? (
                <p className="text-red-400">Low ({scores?.interoperability})</p>
              ) : scores?.interoperability < 50 ? (
                <p className="text-orange-400">
                  Medium ({scores?.interoperability})
                </p>
              ) : (
                <p className="text-green-400">
                  High ({scores?.interoperability})
                </p>
              )}
            </p>
          </div>
          <div className="flex flex-col gap-1 p-1">
            <p>Open Source</p>
            <p>
              {scores?.openSource <= 0 ? (
                <p className="text-red-400">Closed Source</p>
              ) : (
                <p className="text-green-400">Open Source</p>
              )}
            </p>
          </div>
          <div className="flex flex-col gap-1 p-1">
            <p>Rewards</p>
            <p>
              {scores?.rewards < 25 ? (
                <p className="text-red-400">Low ({scores?.rewards})</p>
              ) : scores?.rewards < 50 ? (
                <p className="text-orange-400">Medium ({scores?.rewards})</p>
              ) : (
                <p className="text-green-400">High ({scores?.rewards})</p>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
