import React, { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController,
  ChartOptions,
} from "chart.js";
import { TvlStrategies } from "@/utils/mock-data";

// Register required components
Chart.register(ArcElement, Tooltip, Legend, Title, PieController);

interface PieChartProps {
  tvlStrategies: TvlStrategies;
}

const PieChart: React.FC<PieChartProps> = ({ data = {} }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#FF9F40",
                "#9966FF",
                "#00BFFF",
                "#FF1493",
                "#32CD32",
                "#FFD700",
                "#8A2BE2",
                "#A52A2A",
                "#DC143C",
                "#800080",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  // Format the label to show the label name and value
                  return `${context.label}: ${context.raw}`;
                },
              },
            },
            legend: {
              display: false,
            },
          } as ChartOptions["plugins"],
        },
      });
    }
    // Cleanup: Destroy chart instance when the component is unmounted
    return () => {
      if (chartRef.current !== null) {
        chartRef.current?.destroy();
      }
    };
  }, [data]); // Re-run the effect when the data changes

  return <canvas ref={chartRef} />;
};

export default PieChart;
