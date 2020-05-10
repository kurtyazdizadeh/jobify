import React from 'react';
import { Link } from 'react-router-dom';

function FooterMenu(props) {

  return (
    <footer className="navbar fixed-bottom dark-green">
      <Link to="/map">
        <i onClick={() => props.setView('Map', {})} className="fas fa-map pointer"></i>
      </Link>
      <Link to="/goals">
        <i onClick={() => props.setView('Goals', {})} className="fas fa-star pointer"></i>
      </Link>
      <Link to ="/">
        <span className="menu-circle d-flex justify-content-center align-items-center">
          <i onClick={() => props.setView('Home', {})} className="fas fa-briefcase pointer "></i>
        </span>
      </Link>
      <Link to="/notes">
        <i onClick={() => props.setView('Notes', {})} className="fas fa-sticky-note pointer"></i>
      </Link>
      <Link to="/search">
        <i onClick={() => props.setView('Search', {})} className="fas fa-search pointer"></i>
      </Link>
    </footer>
  );
}

export default FooterMenu;
