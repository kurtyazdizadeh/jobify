import React from 'react';

class ExpandedNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null
    };
  }

  componentDidMount() {
    this.getJob();
  }

  getJob() {
    fetch('/api/saved-job')
      .then(data => data.json())
      .then(job => {
        this.setState({
          job: job
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <div className='d-flex justify-content-around mt-4 py-3 gray'>
          <div>
            <h4>Job Title</h4>
          </div>
          <div>
            <h4>Company</h4>
          </div>
          <div>
            <h4>Location</h4>
          </div>
        </div>
        <div className='d-flex justify-content-around py-3 light-green'>
          <h3>Job Post</h3>
          <button className='btn'>Click to Apply</button>
        </div>
        <div className='d-flex justify-content-around align-items-center py-2 gray'>
          <h3>Rating</h3>
          <i className="fas fa-star text-warning"></i>
          <i className="fas fa-star text-warning"></i>
          <i className="fas fa-star text-warning"></i>
          <i className="fas fa-star text-warning"></i>
          <i className="far fa-star"></i>
        </div>
        <div className='d-flex justify-content-around py-2 light-green'>
          <h3>Interview?</h3>
          <h3>No</h3>
        </div>
        <div className='d-flex justify-content-around py-2 gray'>
          <h3>Status</h3>
          <div>
            <button className='btn'><i className="fas fa-chevron-down"></i> Pending</button>
          </div>
        </div>
        <div className='d-flex justify-content-around py-2 light-green'>
          <h3>Follow up by:</h3>
          <h3>6/10/20</h3>
        </div>
        <div className='d-flex justify-content-around py-2 gray'>
          <div className='d-flex flex-column'>
            <h3 className='m-1'>Documents</h3>
            <button className='m-1'>Upload Docs</button>
            <h6 className='m-1'>Resume <i className="fas fa-file-pdf"></i></h6>
            <h6 className='m-1'>Cover Letter <i className="fas fa-file-pdf"></i></h6>
            <h6 className='m-1'>Letter of Rec <i className="fas fa-file-pdf"></i></h6>
          </div>
          <div>
            <h3 className='m-1'>Notes</h3>
            <button className='m-1'>See Notes</button>
            <h6 className='m-1'>Recent:</h6>
            <h6 className='m-1'>Got letter of rejection today</h6>
            <h6 className='m-1'>Added: 5/1/20</h6>
          </div>
        </div>
      </>
    );
  }
}

export default ExpandedNotes;
