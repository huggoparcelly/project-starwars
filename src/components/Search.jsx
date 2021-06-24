import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Search() {
  const { setFilterName, filters: { filterByName: { name } } } = useContext(TableContext);

  const handleFilter = ({ target }) => {
    const { value } = target;
    setFilterName(value);
  };

  return (
    <header>
      <input
        type="text"
        data-testid="name-filter"
        name="name"
        value={ name }
        onChange={ handleFilter }
      />
    </header>
  );
}

export default Search;
