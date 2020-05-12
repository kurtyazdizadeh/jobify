import React from 'react';

function GoalItems(props) {
  let backgroundColor = '';
  let starColor = '';
  if (props.isActive) {
    backgroundColor = 'light-grey goalItems my-2 d-flex flex-column align-items-center';
  } else {
    backgroundColor = 'light-grey goalItems my-2 d-flex flex-column align-items-center';
  }
  if (props.isAchieved) {
    starColor = 'gold fas fa-star align-self-end';
  } else {
    starColor = 'fas fa-star align-self-end';
  }
  return (
    <div className={backgroundColor}>
      <i className={starColor}></i>
      <h4 className='text-center'>{props.title}</h4>
      <div className='w-100 p-3 d-flex justify-content-between'>
        <button className='btn btn-secondary'>
          <i className='fas fa-minus'></i>
        </button>
        <p>{props.current} / {props.end}</p>
        <button className='btn btn-secondary'>
          <i className='fas fa-plus'></i>
        </button>
      </div>
    </div>
  );
}

export default GoalItems;
