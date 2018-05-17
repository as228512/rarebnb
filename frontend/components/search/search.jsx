import React from 'react';

import HomeIndex from '../homes/home_index';
import HomeMap from '../home_map/home_map';


const Search = ({ homes, updateFilter }) => (
  <div className="home-index-body">
    <div className="home-index">
      <div className="home-index-map">
        <HomeMap
          homes={homes}
          updateFilter={updateFilter}
          singleHome={false}
        />
      </div>
      <HomeIndex key={homes.id} homes={homes} />
    </div>
  </div>
);

export default Search;
