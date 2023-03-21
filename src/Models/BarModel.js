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
    responsive: chartOptions.responsive,
    maintainAspectRatio: false, // Agregamos esta línea
    plugins: {
      backgroundColor: 'white', // color de fondo del lienzo
      legend: {
        position: chartOptions.pluginsLegendPosition,
      },
      title: {
        display: chartOptions.pluginsTitleDisplay,
        text: chartOptions.pluginsTitleText,
      },
    },
    indexAxis: chartOptions.indexAxis,
    element: {
      bar: {
        borderWidth: chartOptions.elementBorders,
      },
    },
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
    <div className="container"  style={{ height: "400px" }}>
      <Bar options={options} data={data} style={{background:"#fff"}} />
    </div>
  );
}
