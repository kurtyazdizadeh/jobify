import React from 'react';

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

  notesView() {
    this.props.setView('Notes', {});
  }

  render() {
    return (
      this.state.noResults
        ? <div className="mt-5 d-flex flex-column align-items-center">
          <h5 className="py-3">{`No ${this.props.category[0].toUpperCase() + this.props.category.slice(1)} Notes`}</h5>
          <button
            className="btn job-listing"
            onClick={this.notesView}>
              Go Back
          </button>
        </div>
        : <div className="mt-5 d-flex flex-column align-items-center">
          <h5 className="py-3">{`${this.state.category} Notes`}</h5>
        </div>
    );
  }
}

export default NotesView;
