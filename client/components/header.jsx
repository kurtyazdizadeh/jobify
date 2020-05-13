import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  render(props) {
    if (this.state.isClicked) {
      return (
        <>
          <nav className="navbar fixed-top dark-green">
            <i onClick={this.handleClick} className="fas fa-bars pointer"></i>
            {this.props.title}
            <i onClick={() => this.props.setView('Profile')} className="fas fa-user-circle pointer"></i>
          </nav>
          <div className='shaded'>
            <div onClick={this.handleClick} className="side-menu">
              <Link to="/home">
                <h6 onClick={() => this.props.setView('Home')} >Saved Jobs</h6>
              </Link>
              <Link to="/search">
                <h6 onClick={() => this.props.setView('Search')}>Search Jobs</h6>
              </Link>
              <Link to="/notes">
                <h6 onClick={() => this.props.setView('Notes')}>Notes</h6>
              </Link>
              <Link to="/goals">
                <h6 onClick={() => this.props.setView('Goals')}>Goals</h6>
              </Link>
              <Link to="/map">
                <h6 onClick={() => this.props.setView('Map')}>Map</h6>
              </Link>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <nav className="navbar fixed-top dark-green">
            <i onClick={this.handleClick} className="fas fa-bars pointer"></i>
            {this.props.title}
            <i onClick={() => this.props.setView('Profile')} className="fas fa-user-circle pointer"></i>
          </nav>
        </>
      );
    }
  }
}

export default Header;
