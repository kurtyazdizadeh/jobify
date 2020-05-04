import React from 'react';
import YourJobsItem from './your-jobs-items';

class YourJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedJobs: []
    };
  }

  componentDidMount() {
    this.getSavedJobs();
  }

  getSavedJobs() {
    fetch('/api/saved-job')
      .then(res => res.json())
      .then(data => {
        this.setState({
          savedJobs: data
        });
      });
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-around mt-5">
          <button>Sort By</button>
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
