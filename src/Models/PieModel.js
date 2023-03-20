import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useContext } from "react";
import { GraphContext } from "../context/graphContext";

ChartJS.register(ArcElement, Tooltip, Legend);

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
    borderColor: chartOptions.borderColor,
  };

  return (
    <div className="container">
      <Pie options={options} data={data} style={{background:"#fff"}}  />
    </div>
  );
}
