import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import useFetch from "../../../hooks/useFetch";

ChartJS.register (
  ArcElement, Tooltip, Legend, Title
);

function LCchart(props) {

  console.log(props.id);

  // get report
  let flag = false;
  const [{ apiData }] = useFetch(props.id);
  if (apiData) {
    flag = true;
  }

  const lc_auditory = apiData?.rows?.[0]?.lc_auditory;
  const lc_visual = apiData?.rows?.[0]?.lc_visual;
  const lc_physical = apiData?.rows?.[0]?.lc_physical;

  const data = {
    labels: ['Auditory', 'Visual', 'Physical'],
    datasets: [{
      label: '',
      data: [lc_auditory, lc_visual, lc_physical],
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
