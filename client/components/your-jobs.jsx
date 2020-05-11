import React from 'react';
import YourJobsItem from './your-jobs-items';

class YourJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isDesc: 'Descending'
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
  }

  toggleOrder() {
    if (this.state.isDesc === 'Descending') {
      this.setState(state => ({ isDesc: 'Ascending' }));
    } else {
      this.setState(state => ({ isDesc: 'Descending' }));
    }
  }

  handleChange(event) {
    event.preventDefault();
    let order = '';
    if (this.state.isDesc === 'Descending') {
      order = 'DESC';
    } else {
      order = 'ASC';
    }
    if (event.target.value === 'Date') {
      this.getSavedJobs(`date_saved ${order}`);
    }
    if (event.target.value === 'Status') {
      this.getSavedJobs(`job_status ${order}`);
    }
    if (event.target.value === 'Rating') {
      this.getSavedJobs(`job_priority ${order}`);
    }
  }

  render() {
    if (this.props.savedJobs !== undefined) {
      return (
        <div className='mt-4 scroll'>
          <div className="form-group d-flex justify-content-around mt-5">
            <form>
              <select className='form-control pointer btn btn-secondary' name="sort" id="sort" onChange={this.handleChange} value = {this.state.value}>
                <option value="" disabled defaultValue>Sort By:</option>
                <option value="Date">Date</option>
                <option value="Rating">Rating</option>
                <option value="Status">Status</option>
              </select>
            </form>
            <button onClick={this.toggleOrder} className='btn btn-secondary'>{this.state.isDesc}</button>
            <button onClick={() => this.props.setView('Add New Job', {})} className='btn btn-secondary'>Add</button>
          </div>
          <table className='jobTable table table-striped text-center text-capitalize mt-2 '>
            <thead>
              <tr>
                <th>Position</th>
                <th>Company</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.savedJobs.map(job => {
                  return (
                    <YourJobsItem
                      key={job.user_job_id}
                      id={job.user_job_id}
                      status={job.job_status}
                      priority={job.job_priority}
                      info={job.job_info}
                      setView={this.props.setView}
                      deleteJob={this.props.deleteJob}
                    />
                  );
                })
              }
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h1 className='mt-5'>Loading</h1>;
    }

  }
}

export default YourJobs;
