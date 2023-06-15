import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useFetch from '../../../hooks/useFetch';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export default function SCP2chart(props) {

  console.log(props.id);

  // get report
  let flag = false;
  const [{ apiData }] = useFetch(props.id, 'report');
  if (apiData) {
    flag = true;
  }

  console.log(apiData);
  const margin = 9;
  const max = 11;

  const scp_leadership = apiData?.rows?.[0]?.scp_leadership;
  const scp_management = apiData?.rows?.[0]?.scp_management;
  const scp_bodybalance = apiData?.rows?.[0]?.scp_bodybalance;
  const scp_logic = apiData?.rows?.[0]?.scp_logic;
  const scp_bodymovement = apiData?.rows?.[0]?.scp_bodymovement;
  const scp_senses = apiData?.rows?.[0]?.scp_senses;
  const scp_rhythm = apiData?.rows?.[0]?.scp_rhythm;
  const scp_visual = apiData?.rows?.[0]?.scp_visual;
  const scp_observation = apiData?.rows?.[0]?.scp_observation;
  const scp_communication = apiData?.rows?.[0]?.scp_communication;

  const arr = {};

  if (scp_leadership > margin && scp_leadership < max) {
    arr["Leadership"] = scp_leadership;
  }
  if (scp_management > margin && scp_management < max) {
    arr["Management"] = scp_management;
  }
  if (scp_bodybalance > margin && scp_bodybalance < max) {
    arr["Body Balance"] = scp_bodybalance;
  }
  if (scp_logic > margin && scp_logic < max) {
    arr["Logic"] = scp_logic;
  }
  if (scp_bodymovement > margin && scp_bodymovement < max) {
    arr["Body Movement"] = scp_bodymovement;
  }
  if (scp_senses > margin && scp_senses < max) {
    arr["Senses"] = scp_senses;
  }
  if (scp_rhythm > margin && scp_rhythm < max) {
    arr["Rhythm"] = scp_rhythm;
  }
  if (scp_visual > margin && scp_visual < max) {
    arr["Visual"] = scp_visual;
  }
  if (scp_observation > margin && scp_observation < max) {
    arr["Observation"] = scp_observation;
  }
  if (scp_communication > margin && scp_communication < max) {
    arr["Communication"] = scp_communication;
  }

  const d = [];
  const l = [];

  console.log(arr);

  for (var x in arr) {
    if (arr.hasOwnProperty(x)) {
      l.push(x);
      d.push(arr[x]);
    }
  }

  console.log(d)

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    maintainAspectRatio: false
  };
  
  const labels = l;
  
  const data = {
    labels,
    datasets: [
      {
        label: '%',
        data: d,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return <Bar options={options} width={"600px"} height={"300px"} data={data} />;
}
