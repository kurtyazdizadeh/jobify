import React from 'react';

function RenderNotes(props) {

  return (
    <>
      <div className='text-center'>
        <h4>{props.title}</h4>
        <p>{props.date}</p>
        <p>{props.note}</p>
      </div>
    </>
  );
}

export default RenderNotes;
