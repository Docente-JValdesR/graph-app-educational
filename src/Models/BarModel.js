import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { GraphContext } from "../context/graphContext";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarModel() {
  const { chartOptions } = useContext(GraphContext);
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Agregamos esta línea
    plugins: {
      legend: {
        position: chartOptions.pluginsLegendPosition,
      },
      title: {
        display: chartOptions.pluginsTitleDisplay,
        text: chartOptions.pluginsTitleText,
      },
    },
    indexAxis: chartOptions.indexAxis,

    scales: chartOptions.scales,
  };

  const data = {
    labels: chartOptions.labels,
    datasets: chartOptions.datasets.map((value) => ({
      label: value.label,
      data: value.data,
      borderColor: value.borderColor,
      backgroundColor: value.backgroundColor,
    })),
  };

  return (
    <div className="container canvas-options">
      <Bar options={options} data={data} className="graph-options" />;
    </div>
  );
}
