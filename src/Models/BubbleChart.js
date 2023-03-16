import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import Chance from "chance";

const chance = new Chance();
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: "Red dataset",
      data: Array.from({ length: 50 }, () => ({
        x: chance.integer({ min: -100, max: 100 }),
        y: chance.integer({ min: -100, max: 100 }),
        r: chance.integer({ min: 5, max: 20 }),
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Blue dataset",
      data: Array.from({ length: 50 }, () => ({
        x: chance.integer({ min: -100, max: 100 }),
        y: chance.integer({ min: -100, max: 100 }),
        r: chance.integer({ min: 5, max: 20 }),
      })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function BubbleChart() {
  return <Bubble options={options} data={data} />;
}
