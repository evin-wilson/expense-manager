import React from 'react';

import './Home.css';

function Home() {
  return (
    <>
      <h1>This Month</h1>
      <section className='d-flex gap-5 pt-4 month-view'>
        <div>
          <p className='mb-1'>Income:</p>
          <p className='fs-2'>500 Rs</p>
        </div>
        <div>
          <p className='mb-1'>Expense:</p>
          <p className='fs-2'>500 Rs</p>
        </div>
        <div>
          <p className='mb-1'>Savings:</p>
          <p className='fs-2'>500 Rs</p>
        </div>
      </section>
      <div style={{ border: 'solid 1px black', width: '75%', height: '350px', marginTop: '30px' }}>
        graph
      </div>
    </>
  );
}

export default Home;
