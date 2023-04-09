import React, { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function SCP1chart() {
  // fetch
  // data -- setarr(data)
  const [arr, setarr] = useState([12.43, 11.86, 11.3])

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    maintainAspectRatio: false
  };

  const labels = ["Leadership", "Management", "Body Balance"];

  const data = {
    labels,
    datasets: [
      {
        label: "%",
        data: arr,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
    maintainAspectRatio: false
  };

  return (
      <Bar options={options} width={"600px"} height={"300px"} data={data} />
  );
}
