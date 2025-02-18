import { Popover } from "radix-ui";
import { ReactNode } from "react";
import { Scores, ScoreWheel } from "./score-wheel";

export function ScoresPopover({
  trigger,
  scores,
}: {
  trigger: ReactNode;
  scores: Scores;
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
                <span>Centralised (0)</span>
              </ScoreTextPair>
              <ScoreTextPair>
                <ScoreTextLabel>Slashing</ScoreTextLabel>
                <span>???</span>
              </ScoreTextPair>
              <ScoreTextPair>
                <ScoreTextLabel>Interoperability</ScoreTextLabel>
                <span>???</span>
              </ScoreTextPair>
              <ScoreTextPair>
                <ScoreTextLabel>Open Source</ScoreTextLabel>
                <span>???</span>
              </ScoreTextPair>
              <ScoreTextPair>
                <ScoreTextLabel>Rewards</ScoreTextLabel>
                <span>???</span>
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
