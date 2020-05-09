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
    const { selectedFile, fileType } = this.state;
    return (
      <div className='container mt-4 py-3 dark-gray'>
        <div>
          <h4 className='title align-middle text-center'>Resume</h4>
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
              <label className="custom-file-label" htmlFor="resume">
                {(selectedFile && fileType === 'resume') ? selectedFile.name : 'Choose File...'}
              </label>
            </div>
            <button type='submit' className='btn button'>Upload</button>
            <button className='button btn col align-items-center'>View</button>
          </form>
        </div>
        <div>
          <h4 className='title align-middle text-center'>Cover Letter</h4>
          <form
            onSubmit={this.handleUploadToServer}
            encType="multipart/form-data">
            <div className="custom-file">
              <input
                type="file"
                name="cover_letter"
                onChange={this.handleUploadChange}
                className="custom-file-input dark-gray"
                id="cover_letter"
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <label className="custom-file-label" htmlFor="cover_letter">
                {(selectedFile && fileType === 'cover_letter') ? selectedFile.name : 'Choose File...'}
              </label>
            </div>
            <button type='submit' className='btn button'>Upload</button>
            <button className='button btn col'>View</button>
          </form>
        </div>
        <div>
          <h4 className='title align-middle text-center'>Letter of Recommendation</h4>
          <form
            onSubmit={this.handleUploadToServer}
            encType="multipart/form-data">
            <div className="custom-file">
              <input
                type="file"
                name="letter_of_recommendation"
                onChange={this.handleUploadChange}
                className="custom-file-input dark-gray"
                id="letter_of_recommendation"
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <label className="custom-file-label" htmlFor="letter_of_recommendation">
                {(selectedFile && fileType === 'letter_of_recommendation') ? selectedFile.name : 'Choose File...'}
              </label>
            </div>
            <button type='submit' className='btn button'>Upload</button>
            <button className='button btn col'>View</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UploadFiles;
