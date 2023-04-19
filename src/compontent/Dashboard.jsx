import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // !!! important for the chart to work

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
