import React from "react";
import { Bar, BarChart } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";

type Props = {};

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "#2563eb",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "#60a5fa",
//   },
// } satisfies ChartConfig;

export default function Stat({ }: Props) {
        const handleClick = (e: React.MouseEvent) => {
          e.stopPropagation();
            alert("Button clicked!");
            console.log("Button clicked!");
        };
  return (
    <div>
      <div>dsdsdssdsdsdสถิติการใช้จ่ายasdadadaaadadadadd</div>
      <button className="bg-income-bg" onClick={handleClick}>buttonnnn</button>
    </div>
  );
}
