import React from 'react';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      category: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('error');
  }

  render() {
    return (
      <div className="mt-5 d-flex flex-column align-items-center">
        <h5 className="py-3">View Notes</h5>
        <div className="container">
          <button className="btn btn-block notes-button">Job Notes</button>
          <button className="btn btn-block notes-button">Networking Events</button>
          <button className="btn btn-block notes-button">Resume Notes</button>
        </div>
        <h5 className="py-3">Add Note</h5>
        <div className="container">
          <form>
            <div>
              <input
                type="text"
                className="form-control"
                id="noteTitle"
                name="noteTitle"
                placeholder="Note Title"
                required
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default Notes;
