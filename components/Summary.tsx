"use client";
import React, { useState, useEffect } from "react";
import summary from "./summary.json";

interface PerilSummary {
  peril: string;
  summary: string;
}

const PerilSummaryComponent: React.FC<{ peril: string }> = ({
  peril = "cyclone",
}) => {
  const perilSummary = summary.summary.find(
    (item: any) => item.peril === peril
  ); // Find summary for the specified peril

  const summaryText = perilSummary ? perilSummary.summary : "Summary not found";
  console.log(summaryText);

  return (
    <div>
      <div>
        <h3 className="text-md font-bold ml-2 mt-4">Summary</h3>
      </div>
      <div>
        <p className="text-sm ml-2 mt-2 mr-44">{summaryText}</p>
      </div>
    </div>
  );
};

export default PerilSummaryComponent;
