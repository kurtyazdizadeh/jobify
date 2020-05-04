import React from 'react';

function YourJobsItem(props) {
  let title = props.info.results[0].title;
  title = title.toString();
  title = title.replace(/(<([^>]+)>)/ig, '');
  return (
    <tr onClick={() => props.setView('Job Detail', { userJobId: props.id })}>
      <td>{title}</td>
      <td>{props.info.results[0].company.display_name}</td>
      <td>{props.status}</td>
      <td>{props.priority}</td>
    </tr>
  );
}

export default YourJobsItem;
