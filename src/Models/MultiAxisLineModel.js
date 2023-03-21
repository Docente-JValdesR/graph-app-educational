import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { GraphContext } from "../context/graphContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function BarModel() {
  const { chartOptions } = useContext(GraphContext);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Agregamos esta línea
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: chartOptions.pluginsLegendPosition,
      },
      title: {
        display: chartOptions.pluginsTitleDisplay,
        text: chartOptions.pluginsTitleText,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: chartOptions.labels,
    datasets: chartOptions.datasets.map((value, index) => ({
      label: value.label,
      data: value.data,
      borderColor: value.borderColor,
      backgroundColor: value.backgroundColor,
      yAxisID: `${index === 0 ? "y":"y1"}`
    })),
  };

  return (
    <div className="container" style={{ height: "400px" }}>
      <Line options={options} data={data} style={{background:"#fff"}}  />
    </div>
  );
}
