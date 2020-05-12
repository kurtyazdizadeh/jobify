import React from 'react';
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';

class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null,
      note: null,
      interviewModal: false,
      interview: new Date(),
      followUpModal: false,
      followUp: new Date()
    };
    this.handleStatus = this.handleStatus.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSendInterview = this.handleSendInterview.bind(this);
    this.handleFollowUpModal = this.handleFollowUpModal.bind(this);
    this.handleFollowUpText = this.handleFollowUpText.bind(this);
    this.handleAddFollowUp = this.handleAddFollowUp.bind(this);
    this.handleUpdateInterview = this.handleUpdateInterview.bind(this);
    this.handleUpdateFollowUp = this.handleUpdateFollowUp.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.setView('Job Details');
    this.getJob(id);
    this.getNote(id);
  }

  getJob(jobId) {
    fetch(`/api/specific-job/${jobId}`)
      .then(data => data.json())
      .then(job => {
        this.setState({
          job: job
        });
      })
      .catch(err => console.error(err));
  }

  handleInterview() {
    let view = this.state.job.interview_date;
    if (this.state.interviewModal === true) {

      view = (
        <div className='d-flex flex-row align-items-center'>
          <DatePicker
            selected={this.state.interview}
            onChange={this.handleDateChange}
          />
          <button
            onClick={this.handleSendInterview}
            className='btn btn-secondary'
          >Add</button>
        </div>
      );
    } else if (view === 'No' || view === 'no' || view === null) {
      view = <button onClick={this.handleSetDate} className='btn btn-secondary'>Set Date</button>;
    } else {
      view = (
        <>
          <h3>{this.props.date(view)}</h3>
          <i onClick={this.handleUpdateInterview} className="fas fa-edit"></i>
        </>
      );
    }
    return view;
  }

  handleSetDate(event) {
    event.preventDefault();
    this.setState({
      interviewModal: true
    });
  }

  handleDateChange(date) {
    this.setState({
      interview: date
    });
  }

  handleSendInterview(event) {

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ interview: this.state.interview })
    };

    fetch(`/api/interview/${this.props.match.params.id}`, params)
      .then(date => date.json())
      .then(res => {
        const newDate = this.props.date(res.interview_date);
        const date = Object.assign(this.state.job);
        date.interview_date = newDate;
        this.setState({
          job: date,
          interviewModal: false
        });
      })
      .catch(err => console.error(err));
  }

  handleStatus(event) {
    event.preventDefault();
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: event.target.value })
    };
    fetch(`/api/status/${this.props.match.params.id}`, params)
      .then(res => res.json())
      .then(data => {
        const newStatus = Object.assign(this.state.job);
        newStatus.job_status = data.job_status;
        this.setState({
          job: newStatus
        });
      })
      .catch(err => console.error(err));
  }

  handleUpdateInterview(event) {
    this.setState({
      interviewModal: true
    });
  }

  toggleFollowUp() {
    const followUpDate = this.state.job.follow_up_date;
    if (this.state.followUpModal === true) {
      return (
        <div className='d-flex flex-row align-items-center'>
          <DatePicker
            selected={this.state.followUp}
            onChange={this.handleFollowUpText}
          />
          <button
            onClick={this.handleAddFollowUp}
            className='btn btn-secondary'
          >Add</button>
        </div>
      );
    } else if (followUpDate === null) {
      return <button onClick={this.handleFollowUpModal} className='btn btn-secondary'>Set Date</button>;
    } else {
      return (
        <>
          <h3>{this.props.date(followUpDate)}</h3>
          <i onClick={this.handleUpdateFollowUp} className="fas fa-edit"></i>
        </>
      );
    }
  }

  handleFollowUpModal(event) {
    this.setState({
      followUpModal: true
    });
  }

  handleFollowUpText(date) {

    this.setState({
      followUp: date
    });
  }

  handleAddFollowUp(event) {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: this.state.followUp })
    };
    fetch(`/api/follow-up/${this.props.match.params.id}`, params)
      .then(res => res.json())
      .then(date => {
        const newDate = Object.assign(this.state.job);
        newDate.follow_up_date = date.follow_up_date;
        this.setState({
          job: newDate,
          followUpModal: false
        });
      })
      .catch(err => console.error(err));
  }

  handleUpdateFollowUp(event) {
    this.setState({
      followUpModal: true
    });
  }

  getNote(jobId) {
    fetch(`/api/notes/${jobId}`)
      .then(data => data.json())
      .then(notes => {
        const { empty } = notes;
        if (empty) {
          this.setState({
            note: {
              note_title: 'No notes',
              note_content: '',
              date_posted: ''
            }
          });
        } else {
          const date = this.props.date(notes[0].date_posted);
          notes[0].date_posted = date;
          this.setState({
            note: notes[0]
          });
        }
      })
      .catch(err => console.error(err));
  }

  changeRating(star) {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rating: star })
    };
    fetch(`/api/rating/${this.props.match.params.id}`, params)
      .then(res => res.json())
      .then(rating => {
        const newRating = Object.assign(this.state.job);
        newRating.job_priority = rating.job_priority;
        this.setState({
          job: newRating
        });
      })
      .catch(err => console.error(err));
  }

  getRating(star) {
    const priority = this.state.job.job_priority;
    return (priority >= star
      ? 'fas fa-star text-warning'
      : 'fas fa-star');
  }

  viewDocs() {
    const { id } = this.props.match.params;
    let { title, company } = this.state.job.job_info;

    title = title.replace(/(<([^>]+)>)/ig, '');
    title = title.split('').filter(char => char !== '/' && char !== ' ' && char !== '.').join('');
    company = company.split('').filter(char => char !== '/' && char !== ' ' && char !== '.').join('');

    this.props.history.push(`/details/docs/${id}?company=${company}&title=${title}`);
    this.props.setView('Upload Files', { id, title, company });
  }

  viewJobNotes() {
    const { id } = this.props.match.params;

    this.props.history.push(`/details/notes/${id}`);
    this.props.setView('Job Note', { id });
  }

  render() {
    if (this.state.job === null || this.state.note === null) {
      return <h1>Job</h1>;
    }
    let { title } = this.state.job.job_info;
    title = title.replace(/(<([^>]+)>)/ig, '');
    const info = this.state.job.job_info;
    return (
      <>
        <div className='text-center mt-5 py-2 dark-gray'>
          <h4>{title}</h4>
          <h5>{info.company}</h5>
          <h5>{`${info.city || info.county}, ${info.state}`}</h5>
        </div>
        <div className='d-flex justify-content-around py-2 light-green'>
          <h3>Job Post</h3>
          <button className='btn btn-secondary'>
            <a href={info.url} className='text-light'>Click to Apply</a>
          </button>
        </div>
        <div className='d-flex justify-content-around align-items-center py-2 dark-gray'>
          <h3>Rating</h3>
          <i className={this.getRating(1)}
            onClick={() => this.changeRating(1)}></i>
          <i className={this.getRating(2)}
            onClick={() => this.changeRating(2)}></i>
          <i className={this.getRating(3)}
            onClick={() => this.changeRating(3)}></i>
          <i className={this.getRating(4)}
            onClick={() => this.changeRating(4)}></i>
          <i className={this.getRating(5)}
            onClick={() => this.changeRating(5)}></i>
        </div>
        <div className='d-flex justify-content-around align-items-center py-2 light-green'>
          <h3>Interview</h3>
          {this.handleInterview()}
        </div>
        <div className='d-flex justify-content-around py-2 dark-gray'>
          <h3>Status</h3>
          <div>
            <form action="submit">
              <select
                name="status"
                id="status"
                className='form-control pointer btn btn-secondary'
                value='this.state.job.job_status'
                onChange={this.handleStatus}>
                <option value='' defaultValue>{this.state.job.job_status}</option>
                <option value="None">None</option>
                <option value="Pending">Pending</option>
                <option value="In-Progress">In Progress</option>
                <option value="Interview">Interview Scheduled</option>
                <option value="Denied">Denied</option>
              </select>
            </form>
          </div>
        </div>
        <div className='d-flex justify-content-around align-items-center py-2 light-green'>
          <h3>Follow up by:</h3>
          {this.toggleFollowUp()}
        </div>
        <div className='d-flex justify-content-around py-2 dark-gray'>
          <div className='d-flex flex-column'>
            <h3 className='m-1'>Documents</h3>
            <button className='m-1 btn btn-secondary' onClick={() => this.viewDocs()}>Upload Docs</button>
            <h6 className='m-1'>Resume <i className="fas fa-file-pdf"></i></h6>
            <h6 className='m-1'>Cover Letter <i className="fas fa-file-pdf"></i></h6>
            <h6 className='m-1'>Letter of Rec <i className="fas fa-file-pdf"></i></h6>
          </div>
          <div>
            <h3 className='m-1'>Notes</h3>
            <button className='m-1 btn btn-secondary'
              onClick={() => this.viewJobNotes()}>
              See All Notes
            </button>
            <h6 className='m-1'>{this.state.note.note_title}</h6>
            <h6 className='m-1'>{this.state.note.date_posted}</h6>
            <p className='m-1'>{this.state.note.note_content}</p>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(JobDetails);
