import React from 'react';

function RenderNotes(props) {
  let bgColor = '';
  if (props.index % 2 === 0) {
    bgColor = 'bg-grey';
  }

  let icon = <i className="fas fa-trash float-right red" onClick={props.delete}></i>;
  if (props.title === 'No notes for this job') {
    icon = '';
  }
  return (
    <>
      <div className={`${bgColor} p-3`}>
        <h4>{props.title}{icon}</h4>
        <p>{props.date}</p>
        <p>{props.note}</p>
      </div>
    </>
  );
}
export default RenderNotes;
