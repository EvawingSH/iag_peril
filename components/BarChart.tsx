import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  perilCategory: string;
}

interface DataItem {
  factor: string;
  factor_group: string;
  median_premium_per_1m_aud: GLfloat;
}

import colors from "tailwindcss/colors";

const primaryColor = colors.violet[600];

const factors = [
  "construction_type",
  "building_age",
  "number_of_stories",
  "floor_height_in_metres",
];

const formatLabel = (factor: string): string => {
  let formatted = factor.replace(/_/g, " ");
  formatted =
    formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();

  return formatted;
};

const BarChart: React.FC<BarChartProps> = ({ perilCategory }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [selectedFactor, setSelectedFactor] = useState<
    (typeof factors)[number]
  >(factors[0]);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch(`/api/${perilCategory}-data`)
      .then((res) => res.json())
      .then((fetchedData: DataItem[]) => {
        const sortedData = fetchedData.sort(
          (a, b) => b.median_premium_per_1m_aud - a.median_premium_per_1m_aud,
        );
        setData(sortedData);
        updateChartData(sortedData, selectedFactor);
      })
      .catch((error: Error) => console.error("Error fetching data:", error));
  }, [perilCategory, selectedFactor]);

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const updateChartData = (
    data: DataItem[],
    factor: (typeof factors)[number],
  ) => {
    const filteredData = data.filter((item) => item.factor === factor);

    setChartData({
      labels: filteredData.map((item) => item.factor_group),
      datasets: [
        {
          label: `Median premium per $1m AUD insurance cover`,
          data: filteredData.map((item) => item.median_premium_per_1m_aud),
          backgroundColor: primaryColor,
          borderColor: primaryColor,
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="pl-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-between text-sm">
          {formatLabel(selectedFactor)}
          <ChevronDown size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="menu-style ">
          {factors.map((factor) => (
            <DropdownMenuItem
              key={factor}
              onSelect={() => setSelectedFactor(factor)}
            >
              {formatLabel(factor)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
export default BarChart;
