import React from 'react';
// eslint-disable-next-line no-unused-vars
import { render } from 'react-dom';

class GoalItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createStarColor = this.createStarColor.bind(this);
  }

  createStarColor() {
    let starColor = '';
    if (this.props.current === this.props.end) {
      starColor = 'gold fas fa-star align-self-end';
    } else {
      starColor = 'fas fa-star align-self-end';
    }
    return starColor;
  }

  render() {
    const backgroundColor = 'light-grey goalItems my-2 d-flex flex-column align-items-center';
    const starColor = this.createStarColor();
    return (
      <div className={backgroundColor}>
        <i className={starColor}></i>
        <h4 className='text-center'>{this.props.title}</h4>
        <div className='w-100 p-3 d-flex justify-content-between'>
          <button className='btn btn-secondary'>
            <i onClick={() => this.props.minusGoal(this.props.id)} className='fas fa-minus'></i>
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
