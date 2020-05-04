import React from 'react';

class UploadFiles extends React.Component {

  render() {
    return (
      <div className='container mt-5 py-3 dark-gray'>
        <div>
          <h4 className='title align-middle text-center'>Resume</h4>
          <button className='button btn col align-items-center'>View</button>
          <button className='button btn col'>Upload</button>
          <button className='button col btn'>Delete</button>
        </div>
        <div>
          <h4 className='title align-middle text-center'>Cover Letter</h4>
          <button className='button btn col'>View</button>
          <button className='button btn col'>Upload</button>
          <button className='button col btn '>Delete</button>
        </div>
        <div>
          <h4 className='title align-middle text-center '>Letter of Recommendation</h4>
          <button className='button btn col'>View</button>
          <button className='button btn col'>Upload</button>
          <button className='button btn col'>Delete</button>
        </div>
      </div>
    );
  }
}

export default UploadFiles;
