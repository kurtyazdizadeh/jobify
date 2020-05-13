import React from 'react';

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
      starColor = 'fas fa-star';
    }
    return starColor;
  }

  render() {
    const backgroundColor = 'light-grey goalItems my-2 d-flex flex-column align-items-center';
    const starColor = this.createStarColor();
    return (
      <div className={`${backgroundColor} w-100 my-2 d-flex flex-column align-items-center`}>
        <i className={`${starColor} align-self-end p-2`}></i>
        <h4 className='text-center'>{this.props.title}</h4>
        <div className='w-100 p-3 d-flex justify-content-between'>
          <button className='btn bg-grey'>
            <i onClick={() => this.props.minusGoal(this.props.id)} className='fas fa-minus'></i>
          </button>
          <p>{this.props.current} / {this.props.end}</p>
          <button className='btn bg-grey'>
            <i onClick={() => this.props.plusGoal(this.props.id)} className='fas fa-plus'></i>
          </button>
        </div>
      </div>
    );
  }
}

export default GoalItems;
