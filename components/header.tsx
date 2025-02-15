import React from "react";

const Header = () => {
  return (
    <div className="p-3 flex flex-col lg:flex-row bg-background text-foreground lg:items-start justify-between gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          <strong>AVS</strong> Beat
        </h1>
        <p className="">
          A AVS dashboard to compare and analyze all AVS implementations
        </p>
      </div>
      <div className="flex gap-2 items-center border-foreground px-2 rounded-full">
        <div className="min-w-3 min-h-3 rounded-full bg-green-500"></div>
        <p className="">Last Update: {"date-goes-here"}</p>
      </div>
    </div>
  );
};

export default Header;
