import React from 'react';

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
    let menu;
    if (this.state.isClicked === true) {
      menu = (
        <div className='container '>
          <nav className="navbar fixed-top dark-green ">
            <i onClick={this.handleClick} className="fas fa-bars pointer"></i>
            {this.props.title}
            <i onClick={() => this.props.setView('Profile', {})} className="fas fa-user-circle pointer"></i>
          </nav>
          <div onClick={this.handleClick} className="side-menu">
            <h6 onClick={() => props.setView('Saved Jobs', {})} >Saved Jobs</h6>
            <h6 onClick={() => props.setView('Search for Jobs', {})}>Search for Jobs</h6>
            <h6 onClick={() => props.setView('Notes', {})}>Notes</h6>
            <h6 onClick={() => props.setView('Activity Statistics', {})}>Activity Statistics</h6>
            <h6 onClick={() => props.setView('Goals', {})}>Goals</h6>
          </div>
        </div>
      );
    } else if (this.state.isClicked === false) {
      menu = (
        <div>
          <nav className="navbar fixed-top dark-green">
            <i onClick={this.handleClick} className="fas fa-bars pointer"></i>
            {this.props.title}
            <i onClick={() => this.props.setView('Profile', {})} className="fas fa-user-circle pointer"></i>
          </nav>
          <div >
          </div>
        </div>
      );
    }
    return menu;
  }
}

export default Header;
