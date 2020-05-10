import React from 'react';
import { Link } from 'react-router-dom';

class NotesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      category: '',
      noResults: false
    };
    this.notesView = this.notesView.bind(this);
  }

  componentDidMount() {
    fetch(`/api/notes/view/${this.props.category}`)
      .then(res => res.json())
      .then(notes => {
        if (!notes.length) {
          this.setState({ noResults: true });
        } else {
          this.setState({ notes: notes, category: notes[0].note_type });
        }
      })
      .catch(err => console.error(err));
  }

  renderNoteItems() {
    const noteItemsElements = this.state.notes.map((note, index) => {
      const { date_posted: date, note_content: content, note_title: title, note_id: id } = note;

      let bgColor = '';
      if (index % 2 === 0) {
        bgColor = 'bg-grey';
      }
      return (
        <div key={id} className={`${bgColor} p-3`}>
          <h6>{title}</h6>
          <h6>Added: {this.props.date(date)}</h6>
          <p>{content}</p>
        </div>
      );
    });
    return noteItemsElements;
  }

  notesView() {
    this.props.setView('Notes');
  }

  render() {
    return (
      this.state.noResults
        ? <div className="mt-5 d-flex flex-column align-items-center">
          <h5 className="py-3">{`No ${this.props.category[0].toUpperCase() + this.props.category.slice(1)} Notes`}</h5>
          <Link to="/notes">
            <button
              className="btn job-listing"
              onClick={this.notesView}>
              Go Back
            </button>
          </Link>
        </div>
        : <div className="my-5 d-flex flex-column align-items-center">
          <h5 className="py-3">{`${this.state.category} Notes`}</h5>
          <div className="notes-area">
            {this.renderNoteItems()}
          </div>
          <Link to="/notes">
            <button className="btn bg-grey m-3" onClick={this.notesView}>Go Back</button>
          </Link>
        </div>
    );
  }
}

export default NotesView;
