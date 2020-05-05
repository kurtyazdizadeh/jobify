import React from 'react';

class JobListingItem extends React.Component {
  constructor(props) {
    super(props);
    this.saveJob = this.saveJob.bind(this);
  }

  saveJob(event) {
    event.target.className = 'fas fa-heart like-button';

    const params = {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.props)
    };

    // POST request for backend!
    // fetch('/api/save-job', params)
    //   .then()
    //   .then()
    //   .catch(err => console.err(err));

  }

  render() {
    console.log(this.props);
    const { title, company, city, state, county, url } = this.props;
    let { contract } = this.props;

    switch (contract) {
      case 'full_time':
        contract = 'Full-Time';
        break;
      case 'part_time':
        contract = 'Part-Time';
        break;
      case 'contract':
        contract = 'Contract';
        break;
      default:
        break;
    }

    return (
      <div className="job-listing d-flex p-2 my-2 rounded">
        <div className="logo align-self-center mr-2">
          <img src="https://loremflickr.com/75/75" />
        </div>
        <div className="job-list-text d-flex flex-column">
          <div className="job-title">{title}</div>
          <div className="job-company">{company}</div>
          <div className="job-location">{city || county}, {state}</div>
          <div className="job-contract">{contract}</div>
        </div>
        <div className="job-list-buttons ml-auto d-flex flex-column justify-content-between align-items-end">
          <i
            className="far fa-heart like-button"
            onClick={this.saveJob}
          ></i>
          <button
            className="btn job-link"
            onClick={() => {
              window.location.href = url;
            }}
          >
            See Job Post
          </button>
        </div>
      </div>
    );
  }
}

export default JobListingItem;
