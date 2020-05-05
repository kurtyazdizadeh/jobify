import React from 'react';

class AddNewJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      position: '',
      dateOfApplication: '',
      followUp: '',
      rating: 0,
      isInterviewScheduled: false,
      notes: ''
    };
    this.handleClickInterviewYes = this.handleClickInterviewYes.bind(this);
    this.handleClickInterviewNo = this.handleClickInterviewNo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.resetForm();
  }

  resetForm() {
    this.setState({
      companyName: '',
      position: '',
      dateOfApplication: '',
      followUp: '',
      rating: 0,
      isInterviewScheduled: false,
      notes: ''
    });
  }

  render() {
    return (
      <div>
        <form
          className='addJob align-middle text-center'
          onSubmit={this.handleSubmit}
        >
          <label className='heading'>
            Company Name:<br></br>
            <input
              className='text form-control light-gray'
              type='text'
              name='CompanyName'
              size='30'></input>
          </label>
          <label className='heading'>
            Position Applied for:<br></br>
            <input
              className='text form-control light-gray'
              type='text'
              name='position'
              size='30'></input>
          </label>
          <label className='heading'>
            Date of Applicaiton:<br></br>
            <input
              className='text form-control light-gray'
              type='text'
              name='application'
              size='30'></input>
          </label>
          <label className='heading'>
            Follow up by:<br></br>
            <input
              className='text form-control light-gray'
              type='text'
              name='followUp'
              size='30'></input>
          </label>
          <div>
            <p className='heading'>Star Rating</p>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
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
              className='text light-gray'
              name='Notes'
              cols='40'
              rows='5'></textarea>
          </div>
          <div>
            <button className='button btn col'>Files</button>
            <button className='button btn col'>Submit</button>
            <button className='button btn col'>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewJob;
