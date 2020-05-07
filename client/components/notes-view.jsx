import React from 'react';

class NotesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    fetch(`/api/notes/view/${this.props.category}`)
      .then(res => res.json())
      .then(notes => {
        this.setState({ notes: notes });
      })
      .catch(err => console.error(err));
  }

  render() {
    return <div>CATEGORY OF NOTES</div>;
  }
}

export default NotesView;
