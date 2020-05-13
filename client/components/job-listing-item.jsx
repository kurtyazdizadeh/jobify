import React from 'react';

class JobListingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: ''
    };
    this.loadingImage = this.loadingImage.bind(this);
  }

  componentDidMount() {
    fetch(`/api/logo/${this.props.company}`)
      .then(res => res.json())
      .then(imgURL => {
        this.setState({ logo: imgURL });
      })
      .catch(err => console.error(err));
  }

  loadingImage(event) {
    event.target.src = '../images/loading.gif';
  }

  render() {
    const { logo } = this.state;
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
        <div className="align-self-center mr-2">
          <img src={logo} className="logo" onError={this.loadingImage} />
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
            onClick={() => this.props.saveJob(event, this.props)}
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
