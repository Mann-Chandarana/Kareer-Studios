import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register (
  ArcElement, Tooltip, Legend, Title
);

function LCchart() {

  const data = {
    labels: ['Auditory', 'Visual', 'Physical'],
    datasets: [{
      label: '',
      data: [30, 32, 38],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 0.75
    }]
  }

  return (
    <div className="App" style = { { width: '300px', height: '300px' } }>
      <Doughnut data = {data} />
    </div>
  );
}
export default LCchart;
