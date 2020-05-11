import React from 'react';

function RenderNotes(props) {
  return (
    <>
      <div className='text-center'>
        <h4>{props.title}</h4>
        <p>{props.date}</p>
        <p>{props.note}</p>
        <i className="fas fa-trash-alt" onClick={props.delete}></i>
      </div>
    </>
  );
}

export default RenderNotes;
