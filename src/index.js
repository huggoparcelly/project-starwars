import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TableProvider from './context/TableProvider';

ReactDOM.render(
  <TableProvider>
    <App />
  </TableProvider>,
  document.getElementById('root'),
);
