import React from 'react';
// eslint-disable-next-line no-unused-vars
import { render } from 'react-dom';

class GoalItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createBackground = this.createBackground.bind(this);
    this.createStarColor = this.createStarColor.bind(this);
  }

  createBackground() {
    let backgroundColor = '';

    if (this.props.isActive) {
      backgroundColor = 'light-grey goalItems my-2 d-flex flex-column align-items-center';
    } else {
      backgroundColor = 'light-grey goalItems my-2 d-flex flex-column align-items-center';
    }

    return backgroundColor;
  }

  createStarColor() {
    let starColor = '';
    if (this.props.isAchieved) {
      starColor = 'gold fas fa-star align-self-end';
    } else {
      starColor = 'fas fa-star align-self-end';
    }
    return starColor;
  }

  render() {
    const backgroundColor = this.createBackground();
    const starColor = this.createStarColor();
    return (
      <div className={backgroundColor}>
        <i className={starColor}></i>
        <h4 className='text-center'>{this.props.title}</h4>
        <div className='w-100 p-3 d-flex justify-content-between'>
          <button className='btn btn-secondary'>
            <i className='fas fa-minus'></i>
          </button>
          <p>{this.props.current} / {this.props.end}</p>
          <button className='btn btn-secondary'>
            <i onClick={() => this.props.plusGoal(this.props.id)} className='fas fa-plus'></i>
          </button>
        </div>
      </div>
    );
  }
}

export default GoalItems;
