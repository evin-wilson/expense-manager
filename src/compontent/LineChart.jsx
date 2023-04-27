import React, { useContext } from 'react';
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

import { lineChartDataForTransactions } from '../utilities/chartData';
import AppContext from './context/AppContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

export function LineChart() {
  const { transactionrecords } = useContext(AppContext);
  return <Line data={lineChartDataForTransactions(transactionrecords)} />;
}