import { Popover } from "radix-ui";
import { ReactNode } from "react";
import { Scores, ScoreWheel } from "./score-wheel";
import { cn } from "@/lib/utils";

export function ScoresPopover({
  trigger,
  scores,
  isOpenSource,
  isDecentralised,
}: {
  trigger: ReactNode;
  scores: Scores;
  isOpenSource: boolean;
  isDecentralised: boolean;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5} side="top">
          <div className="hidden items-center gap-20 rounded-lg border border-[#E0E0E0] bg-white p-8 md:flex">
            <div className="h-full w-auto">
              <ScoreWheel isLabeled {...scores} />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <ScoreTextPair>
                <ScoreTextLabel>Decentralised</ScoreTextLabel>
                <span
                  className={cn(
                    isDecentralised ? "text-beatgreen-1" : "text-beatred-1",
                  )}
                >
                  {isDecentralised ? "Yes" : "No"}
                </span>
              </ScoreTextPair>
              <ScoreTextPair>
                <ScoreTextLabel>Slashing</ScoreTextLabel>
                <span
                  className={cn(
                    scores.slashing > 66
                      ? "text-beatred-1"
                      : scores.slashing > 33
                        ? "text-beatorange-2"
                        : "text-beatgreen-1",
                  )}
                >
                  {`${
                    scores.slashing > 66
                      ? "High"
                      : scores.slashing > 33
                        ? "Medium"
                        : "Low"
                  } (${scores.decent})`}
                </span>
              </ScoreTextPair>
              <ScoreTextPair>
                <ScoreTextLabel>Interoperability</ScoreTextLabel>
                <span
                  className={cn(
                    scores.interop < 33
                      ? "text-beatred-1"
                      : scores.interop < 66
                        ? "text-beatorange-2"
                        : "text-beatgreen-1",
                  )}
                >
                  {`${
                    scores.interop < 33
                      ? "Low"
                      : scores.interop < 66
                        ? "Medium"
                        : "High"
                  } (${scores.interop})`}
                </span>
              </ScoreTextPair>
              <ScoreTextPair>
                <ScoreTextLabel>Open Source</ScoreTextLabel>
                <span
                  className={cn(
                    isOpenSource ? "text-beatgreen-1" : "text-beatred-1",
                  )}
                >
                  {isOpenSource ? "Open Source" : "Closed Source"}
                </span>
              </ScoreTextPair>
              <ScoreTextPair>
                <ScoreTextLabel>Rewards</ScoreTextLabel>
                <span
                  className={cn(
                    scores.rewards < 33
                      ? "text-beatred-1"
                      : scores.rewards < 66
                        ? "text-beatorange-2"
                        : "text-beatgreen-1",
                  )}
                >
                  {`${
                    scores.rewards < 33
                      ? "Low"
                      : scores.rewards < 66
                        ? "Medium"
                        : "High"
                  } (${scores.rewards})`}
                </span>
              </ScoreTextPair>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function ScoreTextPair({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

function ScoreTextLabel({ children }: { children: ReactNode }) {
  return <span className="text-black">{children}</span>;
}
