import React from 'react';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  getLocation(event) {
    console.log('geolocation function fired');
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
      case 'jobType':
        change.jobType = event.target.value;
        break;
      default:
        break;
    }
    this.setState(change);
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

    this.props.onSubmit(newSearch);
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
    const labelClasses = '';
    const inputClasses = 'form-control';
    return (
      <form
        className="mt-5 p-2"
        onSubmit={this.handleSubmit}
      >
        <div className={formRowClasses}>
          <label htmlFor="desiredPosition" className={labelClasses}>
            Desired Position
          </label>
          <input
            type="text"
            className={inputClasses}
            id="desiredPosition"
            name="desiredPosition"
            value={this.state.desiredPosition}
            onChange={this.handleChange}
          />
        </div>
        <div className={formRowClasses}>
          <label htmlFor="location" className={labelClasses}>
            Location
          </label>
          <div className="d-flex w-100">
            <input
              type="text"
              className={inputClasses}
              id="location"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
            <i
              className="fas fa-location-arrow align-self-center mx-2 pointer"
              onClick={this.getLocation}
            ></i>
          </div>
        </div>
      </form>
    );
  }
}

export default JobSearch;
