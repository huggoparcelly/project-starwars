import React from 'react';
import './App.css';
import Search from './components/Search';
import Table from './components/Table';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <Search />
      <Table />
    </TableProvider>
  );
}

export default App;
