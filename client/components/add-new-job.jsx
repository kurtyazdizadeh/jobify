/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';

class AddNewJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      position: '',
      dateOfApplication: new Date(),
      followUp: new Date(),
      location: '',
      rating: 0,
      isInterviewScheduled: false,
      interviewDate: new Date()
    };
    this.handleClickInterviewYes = this.handleClickInterviewYes.bind(this);
    this.handleClickInterviewNo = this.handleClickInterviewNo.bind(this);
    this.handleClickRating = this.handleClickRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleApplicationDate = this.handleApplicationDate.bind(this);
    this.handleFollowUpBy = this.handleFollowUpBy.bind(this);
    this.setInterview = this.setInterview.bind(this);
  }

  handleClickInterviewYes() {
    if (this.state.isInterviewScheduled === false) {
      this.setState(state => ({
        isInterviewScheduled: true
      }));
    }
  }

  handleClickInterviewNo() {
    event.preventDefault();

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
      case 'location':
        change.location = event.target.value;
        break;
      default:
        break;
    }
    this.setState(change);
  }

  handleApplicationDate(date) {
    this.setState({
      dateOfApplication: date
    });
  }

  handleFollowUpBy(date) {
    this.setState({
      followUp: date
    });
  }

  handleClickRating(num) {
    event.preventDefault();
    this.setState({ rating: num });
  }

  scheduleInterview() {
    const interview = this.state.isInterviewScheduled;
    if (!interview) {
      return (
        <>
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
        </>
      );
    } else if (interview) {
      return (
        <DatePicker
          className='form-control form-style'
          selected={this.state.interview}
          onChange={this.setInterview}/>
      );
    }
  }

  setInterview(date) {
    this.setState({
      interview: date
    });
  }

  getRating(num) {
    return (
      this.state.rating >= num
        ? 'fa fa-star btn star-rating'
        : 'fa fa-star btn'
    );
  }

  handleSubmit() {
    const {
      companyName,
      position,
      dateOfApplication,
      followUp,
      location,
      rating,
      interviewDate
    } = this.state;
    const newJob = {
      companyName: companyName,
      position: position,
      dateOfApplication: dateOfApplication,
      followUp: followUp,
      location: location,
      rating: rating,
      interviewDate: interviewDate
    };
    this.resetForm();
    return newJob;
  }

  resetForm() {
    this.setState({
      companyName: '',
      position: '',
      dateOfApplication: new Date(),
      followUp: new Date(),
      location: '',
      rating: false,
      isInterviewScheduled: false,
      interviewDate: new Date()
    });
    this.props.history.push('/');
    this.props.setView('Home');
  }

  render() {
    return (
      <div>
        <form
          className='addJob align-middle text-center'
          onSubmit={() => this.props.addJob(event, this.handleSubmit())}
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
              required
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
              required
            />
          </label>
          <label className='heading'>
            Date of Application:<br></br>
            <DatePicker
              className='form-control form-style'
              selected={this.state.dateOfApplication}
              onChange={this.handleApplicationDate}/>
          </label>
          <label className='heading'>
            Follow up by:<br></br>
            <DatePicker
              className='form-control form-style'
              onChange={this.handleFollowUpBy}
              selected={this.state.followUp}/>
          </label>
          <label className='heading'>
            Location:<br></br>
            <input
              id='location'
              className='text form-control light-gray'
              type='text'
              name='location'
              size='30'
              placeholder='ex. City, State'
              value={this.state.location}
              onChange={this.handleChange}
              required
            />
          </label>
          <div>
            <p className='heading'>Star Rating:</p>
            <button
              id='1'
              value={this.state.star1}
              onClick={() => this.handleClickRating(1)}
              className={this.getRating(1)}>
            </button>
            <button
              id='2'
              value={this.state.star2}
              onClick={() => this.handleClickRating(2)}
              className={this.getRating(2)}>
            </button>
            <button
              id='3'
              value={this.state.star3}
              onClick={() => this.handleClickRating(3)}
              className={this.getRating(3)}>
            </button>
            <button
              id='4'
              value={this.state.star4}
              onClick={() => this.handleClickRating(4)}
              className={this.getRating(4)}>
            </button>
            <button
              id='5'
              value={this.state.star5}
              onClick={() => this.handleClickRating(5)}
              className={this.getRating(5)}>
            </button>
          </div>
          <label className='heading'>
            Interview Scheduled?<br></br>
            {this.scheduleInterview()}
          </label>
          <div>
            <button
              className='button btn col'>
            Submit
            </button>
            <button
              className='button btn col'
              onClick={this.resetForm }>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AddNewJob);
