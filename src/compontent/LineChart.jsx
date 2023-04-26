import React from 'react';
import { Line } from 'react-chartjs-2';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Income',
      data: labels.map(() => Math.floor(Math.random() * 2001) - 1000),
      borderColor: 'rgb(36, 115, 16)',
      backgroundColor: 'rgba(36, 115, 16, 0.5)',
    },
    {
      label: 'Expense',
      data: labels.map(() => Math.floor(Math.random() * 2001) - 1000),
      borderColor: 'rgb(245, 39, 39)',
      backgroundColor: 'rgba(245, 39, 39, 0.5)',
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
