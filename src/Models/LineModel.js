import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
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
      })),
    };
  
    return (
      <div className="container">
        <Line options={options} data={data} style={{background:"#fff"}}  />
      </div>
    );
  }
  