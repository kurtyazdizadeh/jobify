import React from 'react';
import { withRouter } from 'react-router-dom';

class JobSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desiredPosition: '',
      location: '',
      distance: '',
      jobType: ''
    };
    this.getLocation = this.getLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  getLocation(event) {
    const success = position => {
      const { latitude, longitude } = position.coords;
      fetch(`/api/location/${latitude}-${longitude}`)
        .then(res => res.json())
        .then(data => {
          const location = data.plus_code.compound_code;
          const cityAndState = location.slice(location.indexOf(' ') + 1, location.lastIndexOf(','));
          this.setState({ location: cityAndState });
        })
        .catch(err => console.error(err));
    };
    const error = () => {
      status.textContent = 'Unable to retrieve your location';
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }

  handleChange(event) {
    const change = {};
    switch (event.target.id) {
      case 'desiredPosition':
        change.desiredPosition = event.target.value;
        break;
      case 'location':
        change.location = event.target.value;
        break;
      case 'distance':
        change.distance = event.target.value;
        break;
      default:
        break;
    }
    this.setState(change);
  }

  handleRadioChange(event) {
    this.setState({ jobType: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { desiredPosition, location, distance, jobType } = this.state;

    const newSearch = {
      desiredPosition: desiredPosition,
      location: location,
      distance: distance,
      jobType: jobType
    };

    this.props.history.push('/search/results');
    this.props.setView('Search Results', newSearch);
    this.resetForm();
  }

  resetForm() {
    this.setState({
      desiredPosition: '',
      location: '',
      distance: '',
      jobType: ''
    });
  }

  render() {
    const formRowClasses = 'form-group d-flex flex-column align-items-center';
    const formRadioClasses = 'form-group d-flex justify-content-around';
    return (
      <form
        className="form-spacing d-flex flex-column justify-content-evenly p-3"
        onSubmit={this.handleSubmit}
      >
        <div className={formRowClasses}>
          <label htmlFor="desiredPosition">
            Desired Position
          </label>
          <input
            type="text"
            className="form-control"
            id="desiredPosition"
            name="desiredPosition"
            placeholder="ex. Web Developer"
            required
            value={this.state.desiredPosition}
            onChange={this.handleChange}
          />
        </div>
        <div className={formRowClasses}>
          <label htmlFor="location">
            Location
          </label>
          <div className="d-flex w-100">
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              required
              placeholder="City, State or Zipcode"
              value={this.state.location}
              onChange={this.handleChange}
            />
            <i
              className="fas fa-location-arrow align-self-center mx-2 pointer"
              onClick={this.getLocation}
            ></i>
          </div>
        </div>
        <div className={formRowClasses}>
          <label htmlFor="distance">
            Distance
          </label>
          <input
            type="number"
            className="form-control"
            id="distance"
            name="distance"
            placeholder="in miles"
            required
            value={this.state.distance}
            onChange={this.handleChange}
          />
        </div>
        <div className={formRadioClasses}>
          <div>
            <label htmlFor="fullTime">
              Full-time
            </label>
            <input
              type="radio"
              className="form-control"
              id="fullTime"
              value="fullTime"
              checked={this.state.jobType === 'fullTime'}
              onChange={this.handleRadioChange}
            />
          </div>
          <div>
            <label htmlFor="partTime">
              Part-time
            </label>
            <input
              type="radio"
              className="form-control"
              id="partTime"
              value="partTime"
              checked={this.state.jobType === 'partTime'}
              onChange={this.handleRadioChange}
            />
          </div>
          <div>
            <label htmlFor="contract">
              Contract
            </label>
            <input
              type="radio"
              className="form-control"
              id="contract"
              value="contract"
              checked={this.state.jobType === 'contract'}
              onChange={this.handleRadioChange}
            />
          </div>
          <div>
            <label htmlFor="any">
              Any
            </label>
            <input
              type="radio"
              className="form-control"
              id="any"
              value="any"
              checked={this.state.jobType === 'any'}
              onChange={this.handleRadioChange}
            />
          </div>
        </div>
        <div className={formRowClasses}>
          <input
            type="submit"
            value="Search"
            className={'btn w-50'}
          />
        </div>
      </form>
    );
  }
}

export default withRouter(JobSearch);
