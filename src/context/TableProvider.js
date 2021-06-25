import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import TableContext from './TableContext';

const optionsFilter = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function TableProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterColumn, setFilterColumn] = useState(optionsFilter);
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
    setFilterNumeric([...filterNumeric, filters]);
  };

  let allData = data;
  const allFilters = filterColumn;

  if (filterName) {
    allData = allData.filter((planet) => planet.name.includes(filterName));
  }

  filterNumeric.map(({ column }) => (
    allFilters.filter((filter) => (
      column === filter ? allFilters.splice(allFilters.indexOf(filter), 1) : null
    ))
  ));

  filterNumeric.filter(({ column, comparison, value }) => {
    if (comparison === 'maior') {
      allData = allData.filter((planet) => (planet[column] > parseInt(value, 10)));
    } else if (comparison === 'menor') {
      allData = allData.filter((planet) => (planet[column] < parseInt(value, 10)));
    } else if (comparison === 'igual') {
      allData = allData.filter((planet) => (planet[column] === parseInt(value, 10)));
    }
    return allData;
  });

  const providerValue = {
    isLoading,
    data,
    allFilters,
    allData,
    filters: {
      filterByName: { name: filterName },
      filterByNumericValues: filterNumeric,
    },
    setFilterName,
    getFilterNumeric,
    setFilterColumn,
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
