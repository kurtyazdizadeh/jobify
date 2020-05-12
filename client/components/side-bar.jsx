import React from 'react';

class SideBar extends React.Component {
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
        <div className='container'>
          <div onClick={this.handleClick} className={`side-menu${this.state.isMenuOpen ? '' : ' hidden'}`}>
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
          <div className={`shaded${this.state.isMenuOpen ? '' : ' fade'}`}>
            <h3 onClick={this.handleClick} className='bars'>&#9776;</h3>
          </div>
        </div>
      );
    }
    return menu;
  }
}

export default SideBar;
