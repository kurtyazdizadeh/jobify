import React from 'react';
import RenderNotes from './render-notes';

class SpecificJobNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: null };
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

  render() {
    if (!this.state.notes) {
      return <h1>Notes</h1>;
    }

    return (
      <div className='mt-5'>
        <button className='ml-2 mt-2 btn btn-secondary'>Add</button>
        {
          this.state.notes.map(note => {
            return <RenderNotes
              key={note.note_id}
              title={note.note_title}
              date={this.props.date(note.date_posted)}
              note={note.note_content}/>;
          })
        }
      </div>
    );
  }
}

export default SpecificJobNotes;
