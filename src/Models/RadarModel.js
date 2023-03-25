import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useContext } from "react";
import { GraphContext } from "../context/graphContext";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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
  };

  const data = {
    labels: chartOptions.labels,
    datasets: chartOptions.datasets.map((value) => ({
      label: value.label,
      data: value.data,
      borderColor: value.borderColor,
      backgroundColor: value.backgroundColor,
      borderWidth: 1,
    })),
  };

  return (
    <div className="container canvas-options">
      <Radar options={options} data={data} className="graph-options" />;
    </div>
  );
}
