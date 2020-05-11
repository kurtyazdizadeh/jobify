import React from 'react';
import { Link } from 'react-router-dom';

class SpecificJobNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      newNote: {
        noteType: 'Job'
      },
      displayAdd: false,
      displayNotes: true
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setView('Job Note');
    this.getAllNotes();
  }

  getAllNotes() {
    fetch(`/api/notes/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(notes => {
        const { empty } = notes;
        if (empty) {
          this.setState({
            notes: [{
              note_title: 'No Notes for this job',
              note_content: '',
              date_posted: '',
              note_id: 1
            }]
          });
        } else {
          this.setState({
            notes: notes
          });
        }
      })
      .catch(err => console.error(err));
  }

  handleAdd(event) {
    this.setState({
      displayAdd: true,
      displayNotes: false
    });
  }

  handleBack() {
    this.props.setView('Job Details', { userJobId: this.props.match.params.id });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      displayAdd: false,
      displayNotes: true,
      newNote: {
        noteType: 'Job',
        note: '',
        noteTitle: ''
      }
    });
  }

  handleTitle(event) {
    event.preventDefault();
    const previous = Object.assign(this.state.newNote);
    previous.noteTitle = event.target.value;
    this.setState({
      newNote: previous
    });
  }

  handleNote(event) {
    event.preventDefault();
    const previous = Object.assign(this.state.newNote);
    previous.note = event.target.value;
    this.setState({
      newNote: previous
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const noteBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newNote)
    };
    fetch(`/api/job-note/${this.props.match.params.id}`, noteBody)
      .then(res => res.json())
      .then(data => {
        if (this.state.notes[0].note_title === 'No Notes for this job') {
          this.setState({
            notes: [data],
            displayAdd: false,
            displayNotes: true,
            newNote: {
              jobType: 'Job',
              note: '',
              noteTitle: ''
            }
          });
        } else {
          const newNote = this.state.notes;
          newNote.push(data);
          this.setState({
            notes: newNote,
            displayAdd: false,
            displayNotes: true,
            newNote: {
              jobType: 'Job',
              note: '',
              noteTitle: ''
            }
          });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.notes) {
      return <h1>Notes</h1>;
    }
    let addClass = 'hidden';
    let notesClass = '';
    if (this.state.displayAdd) {
      addClass = 'pt-3 form-group';
    }
    if (!this.state.displayNotes) {
      notesClass = 'hidden';
    }

    return (
      <div className='mt-5'>
        <div className={addClass}>
          <form action="" onSubmit={this.handleSubmit}>
            <div className='d-flex flex-column'>
              <h4 className='text-center font-weight-bold'>Title</h4>
              <input
                onChange={this.handleTitle}
                value={this.state.newNote.noteTitle}
                type="text"
                required/>
            </div>
            <div className='d-flex flex-column'>
              <h4 className='text-center font-weight-bold'>Note</h4>
              <textarea
                onChange={this.handleNote}
                value={this.state.newNote.note}
                cols='40'
                rows='10'
                required
                className='form-control form-style'></textarea>
            </div>
            <div className='d-flex justify-content-around mt-3'>
              <button className='btn btn-secondary'>Submit</button>
              <button onClick={this.handleCancel} className='btn btn-secondary'>Cancel</button>
            </div>
          </form>
        </div>
        <div className={notesClass}>
          <div>
            <button onClick={this.handleAdd} className='ml-2 my-2 btn btn-secondary'>Add</button>
            <Link to={`/details/${this.props.match.params.id}`}>
              <button onClick={this.handleBack} className='ml-2 my-2 btn btn-secondary'>Back</button>
            </Link>
          </div>

          {
            this.state.notes.map((note, index) => {
              let bgColor = '';
              if (index % 2 === 0) {
                bgColor = 'bg-grey';
              }
              return (
                <div key={note.note_id} className={`text-center ${bgColor}`}>
                  <h4>{note.note_title}</h4>
                  <p>{() => this.props.date(note.date_posted)}</p>
                  <p>{note.note_content}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default SpecificJobNotes;
