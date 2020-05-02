import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar fixed-top dark-green">
        <i className="fas fa-bars"></i>
        {this.props.title}
        <i className="fas fa-user-circle"></i>
      </nav>
    );
  }
}

export default Header;
