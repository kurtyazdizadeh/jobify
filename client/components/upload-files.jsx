import React from 'react';

class UploadFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileType: '',
      resumeURL: null,
      coverURL: null,
      letterURL: null
    };
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.handleUploadToServer = this.handleUploadToServer.bind(this);
  }

  componentDidMount() {
    this.getDocList();
  }

  getDocList() {
    const { userJobId } = this.props.params;

    fetch(`/api/view-docs/${userJobId}`)
      .then(res => res.json())
      .then(files => {
        // eslint-disable-next-line camelcase
        const { resume, cover_letter, letter_of_recommendation } = files;
        this.setState({
          resumeURL: resume,
          coverURL: cover_letter,
          letterURL: letter_of_recommendation
        });
      })
      .catch(err => console.error(err));
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
    const { userJobId } = this.props.params;

    const data = new FormData();
    data.append('file', selectedFile);

    const config = {
      method: 'POST',
      body: data
    };

    fetch(`/api/save-docs/${userJobId}-${fileType}`, config)
      .then(res => res.json())
      .then(result => {
        this.setState({ selectedFile: null, fileType: '' });
        this.getDocList();
      })
      .catch(err => console.error(err));
  }

  renderViewButton(fileURL) {
    if (fileURL !== null) {
      let fileType = '';
      const title = this.props.params.title.split('').filter(char => char !== '/' && char !== ' ' && char !== '.').join('');
      const company = this.props.params.company.split('').filter(char => char !== '/' && char !== ' ' && char !== '.').join('');

      switch (fileURL) {
        case this.state.resumeURL:
          fileType = 'resume';
          break;
        case this.state.coverURL:
          fileType = 'cover-letter';
          break;
        case this.state.letterURL:
          fileType = 'letter-of-rec';
          break;
        default:
          break;
      }

      return (
        <a
          className='btn button'
          href={`./docs/${fileURL}`}
          target="_blank"
          rel="noopener noreferrer"
          download={`${title}-${company}-${fileType}`}
        >
      View
        </a>
      );
    }
  }

  render() {
    const { selectedFile, fileType, resumeURL, coverURL, letterURL } = this.state;
    const docTypes = 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document';
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
                accept={docTypes}
              />
              <label className="custom-file-label" htmlFor="resume">
                {(selectedFile && fileType === 'resume') ? selectedFile.name : 'Choose File...'}
              </label>
            </div>
            <button type='submit' className='btn button'>Upload</button>
            {this.renderViewButton(resumeURL)}
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
                accept={docTypes}
              />
              <label className="custom-file-label" htmlFor="cover_letter">
                {(selectedFile && fileType === 'cover_letter') ? selectedFile.name : 'Choose File...'}
              </label>
            </div>
            <button type='submit' className='btn button'>Upload</button>
            {this.renderViewButton(coverURL)}
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
                accept={docTypes}
              />
              <label className="custom-file-label" htmlFor="letter_of_recommendation">
                {(selectedFile && fileType === 'letter_of_recommendation') ? selectedFile.name : 'Choose File...'}
              </label>
            </div>
            <button type='submit' className='btn button'>Upload</button>
            {this.renderViewButton(letterURL)}
          </form>
        </div>
      </div>
    );
  }
}

export default UploadFiles;
