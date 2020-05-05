import React from 'react';

class ExpandedNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null,
      note: null
    };
  }

  componentDidMount() {
    this.getJob(this.props.params.userJobId);
    this.getNote(this.props.params.userJobId);
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

  getRating(star) {
    const priority = this.state.job.job_priority;
    return (priority >= star
      ? 'fas fa-star text-warning'
      : 'fas fa-star');
  }

  render() {
    if (this.state.job === null || this.state.note === null) {
      return <h1>Job</h1>;
    }
    let title = this.state.job.job_info.results[0].title;
    title = title.replace(/(<([^>]+)>)/ig, '');
    const info = this.state.job.job_info.results[0];

    let interview = this.state.job.interview_date;
    if (interview === 'No' || interview === 'no' || interview === null) {
      interview = 'No';
    }
    return (
      <>
        <div className='d-flex justify-content-between mt-5 py-2 dark-gray'>
          <div>
            <h4>{title}</h4>
          </div>
          <div>
            <h4>{info.company.display_name}</h4>
          </div>
          <div>
            <h4>{info.location.display_name}</h4>
          </div>
        </div>
        <div className='d-flex justify-content-around py-3 light-green'>
          <h3>Job Post</h3>
          <button className='btn btn-secondary'>
            <a href={info.redirect_url} className='text-light'>Click to Apply</a>
          </button>
        </div>
        <div className='d-flex justify-content-around align-items-center py-2 dark-gray'>
          <h3>Rating</h3>
          <i className={this.getRating(1)}></i>
          <i className={this.getRating(2)}></i>
          <i className={this.getRating(3)}></i>
          <i className={this.getRating(4)}></i>
          <i className={this.getRating(5)}></i>
        </div>
        <div className='d-flex justify-content-around py-2 light-green'>
          <h3>Interview?</h3>
          <h3>{interview}</h3>
        </div>
        <div className='d-flex justify-content-around py-2 dark-gray'>
          <h3>Status</h3>
          <div>
            <form action="submit">
              <select name="status" id="" className='btn btn-secondary'>
                <option disabled defaultValue>{this.state.job.job_status}</option>
                <option value="None">None</option>
                <option value="Pending">Pending</option>
                <option value="In-Progress">In Progress</option>
                <option value="Interview">Interview Scheduled</option>
                <option value="Denied">Denied</option>
              </select>
            </form>
          </div>
        </div>
        <div className='d-flex justify-content-around py-2 light-green'>
          <h3>Follow up by:</h3>
          <h3>6/10/20</h3>
        </div>
        <div className='d-flex justify-content-around py-2 dark-gray'>
          <div className='d-flex flex-column'>
            <h3 className='m-1'>Documents</h3>
            <button className='m-1 btn btn-secondary'>Upload Docs</button>
            <h6 className='m-1'>Resume <i className="fas fa-file-pdf"></i></h6>
            <h6 className='m-1'>Cover Letter <i className="fas fa-file-pdf"></i></h6>
            <h6 className='m-1'>Letter of Rec <i className="fas fa-file-pdf"></i></h6>
          </div>
          <div>
            <h3 className='m-1'>Notes</h3>
            <button className='m-1 btn btn-secondary'>See All Notes</button>
            <h6 className='m-1'>{this.state.note.note_title}</h6>
            <h6 className='m-1'>Added: {this.state.note.date_posted}</h6>
            <p className='m-1'>{this.state.note.note_content}</p>
          </div>
        </div>
      </>
    );
  }
}

export default ExpandedNotes;
