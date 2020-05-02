import React from 'react';

class ExpandedNotes extends React.Component {

  render() {
    return (
      <>
        <div className='d-flex justify-content-around'>
          <div>
            <h5>Job Title</h5>
          </div>
          <div>
            <h5>Company</h5>
          </div>
          <div>
            <h5>Location</h5>
          </div>
        </div>
        <div className='d-flex justify-content-around'>
          <h3>Job Post</h3>
          <button>Click to Apply</button>
        </div>
        <div className='d-flex justify-content-around'>
          <h3>Rating</h3>

        </div>
        <div className='d-flex justify-content-around'>
          <h3>Interview?</h3>
          <h3>No</h3>
        </div>
        <div>
          <h3>Status</h3>
          <div>
            pending
          </div>
        </div>
        <div className='d-flex justify-content-around'>
          <h3>Follow up by:</h3>

        </div>
        <div>
          <div>
            <h3>Documents</h3>
            <button>Upload Docs</button>
            <h6>Resume</h6>
            <h6>Cover Letter</h6>
            <h6>Letter of Rec</h6>
          </div>
          <div>
            <h3>Notes</h3>
            <button>See Notes</button>
            <h6>Recent:</h6>
            <h6>Got letter of rejection today</h6>
            <h6>Added: 5/1/20</h6>
          </div>
        </div>
      </>
    );
  }
}

export default ExpandedNotes;
