import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { useContext } from "react";
import { GraphContext } from "../context/graphContext";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

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
    <div className="container" style={{ height: "400px" }}>
      <Bubble options={options} data={data} style={{background:"#fff"}} />
    </div>
  );
}
