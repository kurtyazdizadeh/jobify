import React from 'react';

class FooterMenu extends React.Component {
  render() {
    return (
      <footer className="navbar fixed-bottom dark-green">
        <i className="fas fa-map pointer"></i>
        <i className="fas fa-star pointer"></i>
        <span className="menu-circle d-flex justify-content-center align-items-center">
          <i className="fas fa-search pointer"></i>
        </span>
        <i className="fas fa-sticky-note pointer"></i>
        <i className="fas fa-briefcase pointer"></i>
      </footer>
    );
  }
}

export default FooterMenu;
