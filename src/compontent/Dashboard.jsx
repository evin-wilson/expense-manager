import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Dashboard = ({ chartData }) => {
  return (
    <>
      <div className='graph'>
        <Pie data={chartData} />
      </div>
      <p></p>
    </>
  );
};

export default Dashboard;
