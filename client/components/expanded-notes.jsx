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
        <div>
          <h3>Job Post</h3>
          <button>Click to Apply</button>
        </div>
        <div>
          <h3>Rating</h3>

        </div>
        <div>
          <h3>Interview?</h3>
          <h3>No</h3>
        </div>
        <div>
          <h3>Follow up by:</h3>

        </div>
      </>
    );
  }
}

export default ExpandedNotes;
