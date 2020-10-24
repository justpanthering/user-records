import React, { useState } from 'react';
import { useDataSearch, useData } from '../../../Context/UsersContext/UsersContext';

const Form = () => {
  const data = useData();
  const [query, setQuery] = useState(data.query);
  const seachQueryHandler = useDataSearch();

  return (
    <form className="form-inline">
      <div className="form-group mr-sm-3 mb-2">
        <input type="text"
          className="form-control"
          id="inputSearch"
          placeholder="Search by First or Last Name"
          value={query}
          onChange={(event) => {
            seachQueryHandler(event.target.value);
            setQuery(event.target.value)
          }} />
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          seachQueryHandler(query);
        }}
        className="btn btn-primary mb-2">Search</button>
    </form>
  )
}

export default Form;