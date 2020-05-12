import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar fixed-top dark-green">
        <i className="fas fa-bars pointer"></i>
        {this.props.title}
        <i onClick={() => this.props.setView('Profile', {})} className="fas fa-user-circle pointer"></i>
      </nav>
    );
  }
}

export default Header;
