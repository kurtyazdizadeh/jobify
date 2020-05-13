import React from 'react';

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
      backgroundColor = 'light-gray';
    } else {
      backgroundColor = 'dark-gray';
    }

    return backgroundColor;
  }

  createStarColor() {
    let starColor = '';
    if (this.props.isAchieved) {
      starColor = 'gold fas fa-star';
    } else {
      starColor = 'fas fa-star';
    }
    return starColor;
  }

  render() {
    const backgroundColor = this.createBackground();
    const starColor = this.createStarColor();
    return (
      <div className={`${backgroundColor} goalItems my-2 d-flex flex-column align-items-center`}>
        <i className={`${starColor} align-self-end p-2`}></i>
        <h4 className='text-center'>{this.props.title}</h4>
        <div className='w-100 p-3 d-flex justify-content-between'>
          <button className='btn bg-grey'>
            <i className='fas fa-minus'></i>
          </button>
          <p>{this.props.current} / {this.props.end}</p>
          <button className='btn bg-grey'>
            <i className='fas fa-plus'></i>
          </button>
        </div>
      </div>
    );
  }
}

export default GoalItems;
