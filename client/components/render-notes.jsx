import React from 'react';

function RenderNotes(props) {

  let bgColor = '';
  if (props.index % 2 === 0) {
    bgColor = 'bg-grey';
  }

  let icon = <i className="fas fa-trash-alt" onClick={props.delete}></i>;
  if (props.title === 'No notes for this job') {
    icon = '';
  }
  return (
    <>
      <div className={`${bgColor} text-center`}>
        <h4>{props.title}</h4>
        <p>{props.date}</p>
        <p>{props.note}</p>
        {icon}
      </div>
    </>
  );
}
export default RenderNotes;
