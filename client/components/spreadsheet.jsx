import React from 'react';
import SpreadsheetItem from './spreadsheet-item';

class Spreadsheet extends React.Component {
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
      <table>
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
                <SpreadsheetItem
                  key={job.user_job_id}
                  status={job.job_status}
                  priority={job.job_priority}
                  info={job.job_info}
                />
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

export default Spreadsheet;
