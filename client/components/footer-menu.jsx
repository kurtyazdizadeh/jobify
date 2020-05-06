import React from 'react';

function FooterMenu(props) {

  return (
    <footer className="navbar fixed-bottom dark-green">
      <i onClick={() => props.setView('Map', {})} className="fas fa-map pointer"></i>
      <i onClick={() => props.setView('Goal', {})} className="fas fa-star pointer"></i>
      <span onClick={() => props.setView('Job Search', {})} className="menu-circle d-flex justify-content-center align-items-center">
        <i className="fas fa-search pointer"></i>
      </span>
      <i onClick={() => props.setView('Note', {})} className="fas fa-sticky-note pointer"></i>
      <i onClick={() => props.setView('Home', {})} className="fas fa-briefcase pointer"></i>
    </footer>
  );
}

export default FooterMenu;
