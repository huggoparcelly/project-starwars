import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      setIsLoading(true);
      const planetsApi = await fetchApi();
      setData(planetsApi.results);
      setIsLoading(false);
    };
    getPlanets();
  }, []);

  return (
    <TableContext.Provider value={ { isLoading, data } }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
