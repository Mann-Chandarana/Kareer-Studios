import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import useFetch from "../../../hooks/useFetch";

ChartJS.register (
  ArcElement, Tooltip, Legend, Title
);

function WAchart(props) {

  console.log(props.id);

  // get report
  let flag = false;
  const [{ apiData }] = useFetch(props.id, 'report');
  if (apiData) {
    flag = true;
  }

  const wa_intelligent = apiData?.rows?.[0]?.wa_intelligent;
  const wa_emotional = apiData?.rows?.[0]?.wa_emotional;
  const wa_visionary = apiData?.rows?.[0]?.wa_visionary;
  const wa_creative = apiData?.rows?.[0]?.wa_creative;
  const wa_adverse = apiData?.rows?.[0]?.wa_adverse;

  const data = {
    labels: ['Intelligent', 'Emotional', 'Visionary', 'Creative', 'Adverse'],
    datasets: [{
      label: '',
      data: [wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse],
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
export default WAchart;
