import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useContext } from "react";
import { GraphContext } from "../context/graphContext";


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ScatterModel() {
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: chartOptions.datasets.map((value) => ({
      label: value.label,
      data: value.data,
      backgroundColor: value.backgroundColor,
    })),
  };

  return (
    <div className="container canvas-options">
      <Scatter options={options} data={data} className="graph-options" />;
    </div>
  );
}
