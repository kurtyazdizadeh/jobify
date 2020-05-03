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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
      </form>
    );
  }
}

export default JobSearch;
