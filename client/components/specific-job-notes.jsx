import React from 'react';
import RenderNotes from './render-notes';

class SpecificJobNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      displayAdd: false,
      displayNotes: true
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancle = this.handleCancle.bind(this);
  }

  componentDidMount() {
    this.getAllNotes();
  }

  getAllNotes() {
    fetch(`/api/notes/${this.props.params.userJobId}`)
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

  handleCancle(event) {
    event.preventDefault();
    this.setState({
      displayAdd: false,
      displayNotes: true
    });
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
          <form action="">
            <div className='d-flex flex-column'>
              <label className='text-center font-weight-bold' htmlFor="">Title</label>
              <input type="text" />
            </div>
            <div className='d-flex flex-column'>
              <label className='text-center font-weight-bold' htmlFor="">Note</label>
              <textarea cols='25' rows='15'></textarea>
            </div>
            <div className='d-flex justify-content-around mt-3'>
              <button className='btn btn-secondary'>Submit</button>
              <button onClick={this.handleCancle} className='btn btn-secondary'>Cancle</button>
            </div>
          </form>
        </div>
        <div className={notesClass}>
          <button onClick={this.handleAdd} className='ml-2 mt-2 btn btn-secondary'>Add</button>
          {
            this.state.notes.map(note => {
              return <RenderNotes
                key={note.note_id}
                title={note.note_title}
                date={this.props.date(note.date_posted)}
                note={note.note_content} />;
            })
          }
        </div>
      </div>
    );
  }
}

export default SpecificJobNotes;
