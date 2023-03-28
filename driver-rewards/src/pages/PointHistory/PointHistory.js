import React from 'react';
import { useHistory } from 'react-router-dom';

const PointHistory = () => {
  const history = useHistory();
  const points = [250, 350, 500, 100, 300];
  const transactions = [
    { description: 'Activity Completed', amount: 100 },
    { description: 'Activity Completed', amount: 150 },
    { description: 'Item Purchased', amount: -400 },
    { description: 'Activity Completed', amount: 200 },
  ];

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <button onClick={handleGoBack}>{"<- Back"}</button>
      <h1 style={{ textAlign: 'center' }}>Point History</h1>
      <table style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Description</th>
            <th style={{ textAlign: 'center' }}>Amount</th>
            <th></th>
            <th style={{ textAlign: 'right' }}>
              &nbsp; &nbsp; Total Points
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={index}
              style={{ color: transaction.amount > 0 ? 'green' : 'red' }}
            >
              <td>{transaction.description}</td>
              <td style={{ textAlign: 'center' }}>{transaction.amount}</td>
              <td></td>
              <td style={{ textAlign: 'center' }}>{points[index + 1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointHistory;
