import React from 'react';

class UploadFiles extends React.Component {

  render() {
    return (
      <div className='container mt-4 py-3 dark-gray'>
        <div>
          <h4 className='title align-middle text-center'>Resume</h4>
          <button className='button btn col align-items-center'>View</button>

          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input dark-gray"
              id="customFile"
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <label className="custom-file-label" htmlFor="customFile">Choose file...</label>
          </div>

          <button className='button btn col'>Delete</button>
        </div>
        <div>
          <h4 className='title align-middle text-center'>Cover Letter</h4>
          <button className='button btn col'>View</button>
          <button className='button btn col'>Upload</button>
          <button className='button btn col'>Delete</button>
        </div>
        <div>
          <h4 className='title align-middle text-center'>Letter of Recommendation</h4>
          <button className='button btn col'>View</button>
          <button className='button btn col'>Upload</button>
          <button className='button btn col'>Delete</button>
        </div>
      </div>
    );
  }
}

export default UploadFiles;
