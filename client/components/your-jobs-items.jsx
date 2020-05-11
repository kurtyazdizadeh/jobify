import React from 'react';
import { withRouter } from 'react-router-dom';

class YourJobsItem extends React.Component {
  viewJobDetail() {
    let { title, company } = this.props.info;
    const { id } = this.props;

    title = title.toString();
    title = title.replace(/(<([^>]+)>)/ig, '');

    this.props.history.push(`/details/${id}`);
    this.props.setView('Job Details', { userJobId: id, title, company });
  }

  render() {
    let { title, company } = this.props.info;
    const { id, status, priority } = this.props;
    title = title.toString();
    title = title.replace(/(<([^>]+)>)/ig, '');
    return (
      <tr>
        <td onClick={() => this.viewJobDetail()}>{title}</td>
        <td onClick={() => this.viewJobDetail()}>{company}</td>
        <td onClick={() => this.viewJobDetail()}>{status}</td>
        <td onClick={() => this.viewJobDetail()}>{priority} <i className='fas fa-star gold'></i></td>
        <td><i onClick={() => this.props.deleteJob(id)} className='fas fa-trash red'></i></td>
      </tr>
    );
  }
}

export default withRouter(YourJobsItem);
