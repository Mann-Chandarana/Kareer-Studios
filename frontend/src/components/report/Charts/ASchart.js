import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import useFetch from "../../../hooks/useFetch";

ChartJS.register (
  ArcElement, Tooltip, Legend, Title
);

function ASchart(props) {

  console.log(props.id);

  // get report
  let flag = false;
  const [{ apiData }] = useFetch(props.id);
  if (apiData) {
    flag = true;
  }

  const as_follower = apiData?.rows?.[0]?.as_follower;
  const as_experimental = apiData?.rows?.[0]?.as_experimental;
  const as_different = apiData?.rows?.[0]?.as_different;
  const as_thoughtful = apiData?.rows?.[0]?.as_thoughtful;

  const data = {
    labels: ['Follower', 'Experimental', 'Different', 'Thoughtful'],
    datasets: [{
      label: '%',
      data: [as_follower, as_experimental, as_different, as_thoughtful],
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
export default ASchart;
