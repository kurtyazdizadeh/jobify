import React from 'react';
import { Link } from 'react-router-dom';

function FooterMenu(props) {

  return (
    <footer className="navbar fixed-bottom dark-green">
      <Link to="/map">
        <i className="fas fa-map pointer"></i>
      </Link>
      <Link to="/goals">
        <i className="fas fa-star pointer"></i>
      </Link>
      <Link to ="/">
        <span className="menu-circle d-flex justify-content-center align-items-center">
          <i className="fas fa-briefcase pointer "></i>
        </span>
      </Link>
      <Link to="/notes">
        <i className="fas fa-sticky-note pointer"></i>
      </Link>
      <Link to="/search">
        <i className="fas fa-search pointer"></i>
      </Link>
    </footer>
  );
}

export default FooterMenu;
