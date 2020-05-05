import React from 'react';

function YourJobsItem(props) {
  let title = props.info.title;
  title = title.toString();
  title = title.replace(/(<([^>]+)>)/ig, '');
  return (
    <tr>
      <td onClick={() => props.setView('Job Detail', { userJobId: props.id })}>{title}</td>
      <td onClick={() => props.setView('Job Detail', { userJobId: props.id })}>{props.info.company}</td>
      <td onClick={() => props.setView('Job Detail', { userJobId: props.id })}>{props.status}</td>
      <td onClick={() => props.setView('Job Detail', { userJobId: props.id })}>{props.priority} <i className='fas fa-star gold'></i></td>
      <td><i onClick={() => props.deleteJob(props.id)} className='fas fa-trash red'></i></td>
    </tr>
  );
}

export default YourJobsItem;
