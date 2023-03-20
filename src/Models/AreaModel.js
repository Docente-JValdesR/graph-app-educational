import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from "chart.js";
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
    Filler,
    Legend
  );
  
  export default function AreaModel() {
    const { chartOptions } = useContext(GraphContext);
    const options = {
      responsive: chartOptions.responsive,
      plugins: {
        legend: {
          position: chartOptions.pluginsLegendPosition,
        },
        title: {
          display: chartOptions.pluginsTitleDisplay,
          text: chartOptions.pluginsTitleText,
        },
        backgroundColor: '#ffffff'
      },
    };
  
    const data = {
      labels: chartOptions.labels,
      datasets: chartOptions.datasets.map((value) => ({
        fill:true,
        label: value.label,
        data: value.data,
        borderColor: value.borderColor,
        backgroundColor: value.backgroundColor
      })),
    };
  
    return <Line options={options} data={data} style={{background:"#fff"}}  />;
  }
  