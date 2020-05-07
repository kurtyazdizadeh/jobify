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
    const change = {};
    switch (event.target.id) {
      case 'title':
        change.title = event.target.value;
        break;
      case 'content':
        change.content = event.target.value;
        break;
      case 'category':
        change.category = event.target.value;
        break;
      default:
        break;
    }
    this.setState(change);
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
        <form className="d-flex flex-column align-items-center">
          <div className="title-category d-flex justify-content-between">
            <div className="ml-3">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Note Title"
                required
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="mx-3 form-group">
              <select
                className="form-control form-style"
                name="category"
                id="category"
                onChange={this.handleChange}
                value={this.state.category}>
                <option value="" disabled defaultValue>Category</option>
                <option value="Networking Events">Network Events</option>
                <option value="Resume">Resume</option>
              </select>
            </div>
          </div>
          <div className="content my-3">
            <textarea
              className="form-control form-style"
              name="content"
              id="content"
              cols="40" rows="10"
              onChange={this.handleChange}
              value={this.state.content}>
            </textarea>
          </div>
          <div className="buttons">
            <button className="notes-button mx-3">Submit Note</button>
            <button className="notes-button mx-3">Cancel</button>
          </div>
        </form>
      </div>

    );
  }
}

export default Notes;
