import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { data, isLoading, allData } = useContext(TableContext);

  return data.length > 0 && !isLoading ? (
    <main>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((title) => (
              title === 'residents' ? null : <th key={ title }>{title}</th>))}
          </tr>
        </thead>
        <tbody>
          {allData.map((info, index) => (
            <tr key={ index }>
              {Object.entries(info).map((content) => (
                content[0] === 'residents' ? null
                  : <td key={ content[1] }>{ content[1] }</td>))}
            </tr>))}
        </tbody>
      </table>
    </main>
  ) : <span>Carregando...</span>;
}

export default Table;
