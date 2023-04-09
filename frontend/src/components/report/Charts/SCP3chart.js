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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  maintainAspectRatio: false
};

const labels = ['Observation', 'Communication'];

export const data = {
  labels,
  datasets: [
    {
      label: '%',
      data: [7.91, 6.78],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export default function SCP3chart() {
  return <Bar options={options} width={"600px"} height={"300px"} data={data} />;
}
