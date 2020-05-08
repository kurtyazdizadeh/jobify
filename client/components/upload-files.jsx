import React from 'react';

class UploadFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileType: ''
    };
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.handleUploadToServer = this.handleUploadToServer.bind(this);
  }

  /*
    - Retrieve userJobId from props and use that in DB query to associate file with specific job
    - Build 3 separate forms for each file type
    - Create submit button for each form to prevent default behavior and send a POST request to DB

    - In index.js, use multer to store the file in the public/docs directory
    - Make sure to obscure the filename being stored in the public/docs directory with a hash
    - Store the hashed filename in the Files table of the DB, as well as save the actual name in the table so when
    - the user views/downloads the file, they know what they are looking at.

    - figure out a way to have a modal pop up when they click "view" button to view doc in app.
  */
  handleUploadChange() {
    event.preventDefault();

    this.setState({
      selectedFile: event.target.files[0],
      fileType: event.target.name
    });
  }

  handleUploadToServer() {
    event.preventDefault();
    const { selectedFile, fileType } = this.state;
    const { userJobId } = this.props;

    const data = new FormData();
    data.append('file', selectedFile);

    const config = {
      method: 'POST',
      body: data
    };

    fetch(`/api/save-docs/${userJobId}-${fileType}`, config)
      .then(res => res.json())
      .then(result => this.setState({ selectedFile: null, fileType: '' }))
      .catch(err => console.error(err));

  }

  render() {
    const { selectedFile } = this.state;
    return (
      <div className='container mt-4 py-3 dark-gray'>
        <div>
          <h4 className='title align-middle text-center'>Resume</h4>
          {/* <button className='button btn col align-items-center'>View</button> */}
          <form
            onSubmit={this.handleUploadToServer}
            encType="multipart/form-data">
            <div className="custom-file">
              <input
                type="file"
                name="resume"
                onChange={this.handleUploadChange}
                className="custom-file-input dark-gray"
                id="resume"
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <label className="custom-file-label" htmlFor="resume">{ selectedFile ? selectedFile.name : 'Choose File...'}</label>
            </div>
            <button type='submit' className='btn button'>Upload</button>
          </form>

          {/* <button className='button btn col'>Delete</button> */}
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
