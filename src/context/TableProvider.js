import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterNumeric, setFilterNumeric] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      setIsLoading(true);
      const planetsApi = await fetchApi();
      setData(planetsApi.results);
      setIsLoading(false);
    };
    getPlanets();
  }, []);

  const getFilterNumeric = (filters) => {
    setFilterNumeric(filters);
  };

  let allData = data;

  if (filterName) {
    allData = allData.filter((planet) => planet.name.includes(filterName));
  }

  const { column, comparison, value } = filterNumeric;

  // const valueCompare = parseInt(value, 10);

  if (comparison === 'maior') {
    allData = allData.filter((planet) => (
      planet[column] === 'unknown' ? true : planet[column] > parseInt(value, 10)));
  } else if (comparison === 'menor') {
    allData = allData.filter((planet) => (
      planet[column] === 'unknown' ? true : planet[column] < parseInt(value, 10)));
  } else if (comparison === 'igual') {
    allData = allData.filter((planet) => (
      planet[column] === 'unknown' ? true : planet[column] === parseInt(value, 10)));
  }

  const providerValue = { isLoading,
    data,
    allData,
    filters: {
      filterByName: { name: filterName },
      filterByNumericValues: [filterNumeric],
    },
    setFilterName,
    getFilterNumeric,
  };

  return (
    <TableContext.Provider value={ providerValue }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
