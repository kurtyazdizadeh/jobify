import React from 'react';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    let menu;
    if (this.state.isClicked === true) {
      menu = (
        <div className='container'>
          <div className='aside'>
            <h3 onClick={this.toggle}>Menu</h3>
            <h6>About</h6>
            <h6>Get Started</h6>
            <h6>Sign In</h6>
          </div>
        </div>
      );
    } else if (this.state.isClicked === false) {
      menu = (
        <div>
          <div className='aside'>
            <h3 onClick={this.toggle} className='bars'>&#9776;</h3>
          </div>
        </div>
      );
    }
    return menu;
  }
}

export default SideBar;
