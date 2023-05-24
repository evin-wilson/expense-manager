import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function MonthSelector({ month, setMonth }) {
  return (
    <ButtonGroup className='mb-3'>
      <Button onClick={() => setMonth(new Date(month.setMonth(month.getMonth() - 1)))}>&lt;</Button>
      <Button>
        {month.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </Button>
      <Button onClick={() => setMonth(new Date(month.setMonth(month.getMonth() + 1)))}>&gt;</Button>
    </ButtonGroup>
  );
}

export default MonthSelector;
