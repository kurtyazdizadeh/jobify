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
      <p>{props.current} / {props.end}</p>
    </div>
  );
}

export default GoalItems;
