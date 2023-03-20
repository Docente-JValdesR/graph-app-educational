import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { useContext } from "react";
import { GraphContext } from "../context/graphContext";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function BarModel() {
  const { chartOptions } = useContext(GraphContext);
  const options = {
    responsive: true,
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
    datasets: chartOptions.datasets,
    backgroundColor: chartOptions.backgroundColor,
    borderWidth: 1,
  };

  return (
    <div className="container">
      <PolarArea options={options} data={data} style={{background:"#fff"}}  />
    </div>
  );
}
