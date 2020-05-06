/* eslint-disable no-unused-vars */
import React from 'react';

class AddNewJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      position: '',
      dateOfApplication: '',
      followUp: '',
      rating: false,
      isInterviewScheduled: false,
      notes: ''
    };
    this.handleClickInterviewYes = this.handleClickInterviewYes.bind(this);
    this.handleClickInterviewNo = this.handleClickInterviewNo.bind(this);
    this.handleClickRating = this.handleClickRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleClickInterviewYes() {
    if (this.state.isInterviewScheduled === false) {
      this.setState(state => ({
        isInterviewScheduled: true
      }));
    }
  }

  handleClickInterviewNo() {
    if (this.state.isInterviewScheduled === true) {
      this.setState(state => ({
        isInterviewScheduled: false
      }));
    }
  }

  handleChange(event) {
    const change = {};
    switch (event.target.id) {
      case 'companyName':
        change.companyName = event.target.value;
        break;
      case 'position':
        change.position = event.target.value;
        break;
      case 'dateOfApplication':
        change.dateOfApplication = event.target.value;
        break;
      case 'followUp':
        change.followUp = event.target.value;
        break;
      case 'notes':
        change.notes = event.target.value;
        break;
      default:
        break;
    }
    this.setState(change);
  }

  handleClickRating(event) {
    if (this.state.rating === false) {
      this.setState(state => ({
        rating: true
      }));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      companyName,
      position,
      dateOfApplication,
      followUp, rating,
      isInterviewScheduled,
      notes
    } = this.state;

    const newJob = {
      companyName: companyName,
      position: position,
      dateOfApplication: dateOfApplication,
      followUp: followUp,
      rating: rating,
      isInterviewScheduled: isInterviewScheduled,
      notes: notes
    };
    this.props.setView('Add New Job', newJob);
    // this.resetForm();
  }

  resetForm() {
    this.setState({
      companyName: '',
      position: '',
      dateOfApplication: '',
      followUp: '',
      rating: false,
      isInterviewScheduled: false,
      notes: ''
    });
  }

  render() {
    let starClass = 'fa fa-star btn ';
    if (this.state.rating === true) {
      starClass += 'fa fa-star btn star-rating';
    }
    return (
      <div>
        <form
          className='addJob align-middle text-center'
          onSubmit={this.handleSubmit}
        >
          <label className='heading'>
            Company Name:<br></br>
            <input
              id='companyName'
              className='text form-control light-gray'
              type='text'
              name='CompanyName'
              size='30'
              value={this.state.companyName}
              onChange={this.handleChange}
            />
          </label>
          <label className='heading'>
            Position Applied for:<br></br>
            <input
              id='position'
              className='text form-control light-gray'
              type='text'
              name='position'
              size='30'
              value={this.state.position}
              onChange={this.handleChange}
            />
          </label>
          <label className='heading'>
            Date of Applicaiton:<br></br>
            <input
              id='dateOfApplication'
              className='text form-control light-gray'
              type='text'
              name='application'
              size='30'
              value={this.state.dateOfApplication}
              onChange={this.handleChange}
            />
          </label>
          <label className='heading'>
            Follow up by:<br></br>
            <input
              id='followUp'
              className='text form-control light-gray'
              type='text'
              name='followUp'
              size='30'
              value={this.state.followUp}
              onChange={this.handleChange}
            />
          </label>
          <div>
            <p className='heading'>Star Rating:</p>
            <button
              id='1'
              value={this.state.rating}
              onClick={this.handleClickRating}
              className={starClass}>
            </button>
            <button
              id='2'
              value={this.state.rating}
              onClick={this.handleClickRating}
              className={starClass}>
            </button>
            <button
              id='3'
              value={this.state.rating}
              onClick={this.handleClickRating}
              className={starClass}>
            </button>
            <button
              id='4'
              value={this.state.rating}
              onClick={this.handleClickRating}
              className={starClass}>
            </button>
            <button
              id='5'
              value={this.state.rating}
              onClick={this.handleClickRating}
              className={starClass}>
            </button>
          </div>
          <label className='heading'>
            Interview Scheduled?<br></br>
            <button
              className='button btn col'
              onClick={this.handleClickInterviewYes}>
              Yes
            </button>
            <button
              className='button btn col'
              onClick={this.handleClickInterviewNo}>
              No
            </button>
          </label>
          <div className='heading'>
            Notes:
            <textarea
              id='notes'
              className='text light-gray'
              name='Notes'
              cols='40'
              rows='5'
              value={this.state.notes}
              onChange={this.handleChange}>
            </textarea>
          </div>
          <div>
            <button className='button btn col'>Files</button>
            <button
              className='button btn col'
              onSubmit={this.handleSubmit}>
            Submit
            </button>
            <button
              className='button btn col'
              onClick={this.resetForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewJob;
