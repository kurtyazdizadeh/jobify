import React from 'react';
import YourJobsItem from './your-jobs-items';

class YourJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedJobs: [],
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getSavedJobs('date_applied');
  }

  getSavedJobs(order) {
    fetch(`/api/saved-job/${order}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          savedJobs: data
        });
      });
  }

  handleChange(event) {
    event.preventDefault();
    if (event.target.value === 'Date') {
      this.getSavedJobs('date_applied');
    }
    if (event.target.value === 'Status') {
      this.getSavedJobs('job_status');
    }
    if (event.target.value === 'Rating') {
      this.getSavedJobs('job_priority');
    }
  }

  render() {
    return (
      <div className='mt-4'>
        <div className="form-group d-flex justify-content-around mt-5">
          <form>
            <select className='form-control' name="sort" id="sort" onChange={this.handleChange} value = {this.state.value}>
              <option value="" disabled defaultValue>Sort By:</option>
              <option value="date">Date</option>
              <option value="Rating">Rating</option>
              <option value="Status">Status</option>
            </select>
          </form>
          <button>Add</button>
        </div>
        <table className='table table-striped text-center text-capitalize mt-2 '>
          <thead>
            <tr>
              <th>Position</th>
              <th>Company</th>
              <th>Status</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.savedJobs.map(job => {
                return (
                  <YourJobsItem
                    key={job.user_job_id}
                    id={job.user_job_id}
                    status={job.job_status}
                    priority={job.job_priority}
                    info={job.job_info}
                    setView={this.props.setView}
                  />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default YourJobs;
