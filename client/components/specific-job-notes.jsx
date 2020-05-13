import React from 'react';
import { Link } from 'react-router-dom';
import RenderNotes from './render-notes';

class SpecificJobNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      noteType: 'Job',
      noteTitle: '',
      note: '',
      displayAdd: false,
      displayNotes: true
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
              note_title: 'No notes for this job',
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
      noteType: 'Job',
      noteBody: '',
      noteTitle: ''
    });
  }

  handleTitle(event) {
    this.setState({
      noteTitle: event.target.value
    });
  }

  handleNote(event) {
    this.setState({
      note: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newNote = {
      note: this.state.note,
      noteType: this.state.noteType,
      noteTitle: this.state.noteTitle
    };
    const noteBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    };
    fetch(`/api/job-note/${this.props.match.params.id}`, noteBody)
      .then(res => res.json())
      .then(data => {
        if (this.state.notes[0].note_title === 'No notes for this job') {
          this.setState({
            notes: [data],
            displayAdd: false,
            displayNotes: true,
            noteType: 'Job',
            note: '',
            noteTitle: ''
          });
        } else {
          const newNote = this.state.notes;
          newNote.unshift(data);
          this.setState({
            notes: newNote,
            displayAdd: false,
            displayNotes: true,
            noteType: 'Job',
            note: '',
            noteTitle: ''
          });
        }
      })
      .catch(err => console.error(err));
  }

  handleDelete(id) {

    fetch(`/api/remove-note/${id}`, { method: 'DELETE' })

      .then(res => res.json())
      .then(note => {
        const idToRemove = note.note_id;
        const newNotes = Object.assign(this.state.notes);
        for (let i = 0; i < newNotes.length; i++) {
          if (newNotes[i].note_id === idToRemove) {
            newNotes.splice(i, 1);
          }
        }
        if (!newNotes[0]) {
          this.setState({
            notes: [{
              note_title: 'No notes for this job',
              note_content: '',
              date_posted: '',
              note_id: 1
            }]
          });
        } else {
          this.setState({
            notes: newNotes
          });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.notes) {
      return <h1>Notes</h1>;
    }
    let addClass = 'hidden-note';
    let notesClass = '';
    if (this.state.displayAdd) {
      addClass = 'pt-3 form-group';
    }
    if (!this.state.displayNotes) {
      notesClass = 'hidden-note';
    }

    return (
      <div className='mt-5'>
        <div className={addClass}>
          <form action="" onSubmit={this.handleSubmit}>
            <div className='d-flex flex-column'>
              <h4 className='text-center font-weight-bold'>Title</h4>
              <input
                className='form-control form-style'
                onChange={this.handleTitle}
                value={this.state.noteTitle}
                type="text"
                required/>
            </div>
            <div className='d-flex flex-column'>
              <h4 className='text-center font-weight-bold'>Note</h4>
              <textarea
                onChange={this.handleNote}
                value={this.state.note}
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
              return <RenderNotes
                key={note.note_id}
                index={index}
                title={note.note_title}
                date={this.props.date(note.date_posted)}
                note={note.note_content}

                delete={() => this.handleDelete(note.note_id)} />;

            })
          }
        </div>
      </div>
    );
  }
}

export default SpecificJobNotes;
