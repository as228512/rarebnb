import React from 'react';
import { Link } from 'react-router-dom';

import HomeDetail from './home_detail';
import HomeMap from '../home_map/home_map';

const HomeShow = ({ home, homeId, fetchHome }) => {

  return(
    <div className="single-home-show">
      <div>
        <HomeDetail home={home} />
      </div>
    </div>
  );
};

export default HomeShow;