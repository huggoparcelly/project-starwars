import React, { useContext, useState } from 'react';
import TableContext from '../context/TableContext';

function Search() {
  const { setFilterName, getFilterNumeric, allFilters } = useContext(TableContext);
  const [getNumeric, setGetNumeric] = useState({
    column: 'population',
    comparison: 'maior',
    value: 0,
  });

  const handleFilterName = ({ target }) => {
    const { value } = target;
    setFilterName(value);
  };

  const handleFilterColumn = ({ target }) => {
    const { name, value } = target;
    setGetNumeric({
      ...getNumeric,
      [name]: value,
    });
  };

  function onSubmit(e) {
    e.preventDefault();
    getFilterNumeric({
      column: getNumeric.column,
      comparison: getNumeric.comparison,
      value: getNumeric.value,
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <label htmlFor="name">
        Filtrar por nome
        <input
          type="text"
          data-testid="name-filter"
          name="name"
          id="name"
          onChange={ handleFilterName }
        />
      </label>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleFilterColumn }
      >
        {allFilters.map((filter) => (
          <option key={ filter } value={ filter }>{filter}</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleFilterColumn }
      >
        <option value="maior">maior que</option>
        <option value="menor">menor que</option>
        <option value="igual">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleFilterColumn }
      />
      <button
        type="submit"
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}

export default Search;
