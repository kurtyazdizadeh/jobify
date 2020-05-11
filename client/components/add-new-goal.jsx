import React from 'react';

class AddNewGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: '',
      endGoal: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setView('Add Goal');
  }

  handleChange(event) {
    const change = {};
    switch (event.target.id) {
      case 'title':
        change.title = event.target.value;
        break;
      case 'type':
        change.type = event.target.value;
        break;
      case 'endGoal':
        change.endGoal = event.target.value;
        break;
      default:
        break;
    }
    this.setState(change);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newGoal = {
      title: this.state.title,
      type: this.state.type,
      endGoal: this.state.endGoal
    };
    this.props.onSubmit(newGoal);
    this.resetForm(event);
  }

  resetForm(event) {
    event.preventDefault();
    this.setState({
      title: '',
      type: '',
      endGoal: ''
    });
  }

  render() {
    return (
      <div>
        <form className='mt-5 align-middle text-center' onSubmit={this.handleSubmit}>
          <h3 className='heading mb-4'>
            Goal Title:
            <input
              id='title'
              className='text form-control light-gray'
              type="text"
              name='title'
              size='30'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </h3>
          <h3 className='heading mb-4'>
            Goal Type:
            <input
              id='type'
              className='text form-control light-gray'
              type="text"
              name='type'
              size='30'
              value={this.state.type}
              onChange={this.handleChange}
            />
          </h3>
          <h3 className='heading mb-4'>
            Goal End Goal:
            <input
              id='endGoal'
              className='text form-control light-gray'
              type="number"
              name='endGoal'
              size='30'
              value={this.state.endGoal}
              onChange={this.handleChange}
            />
          </h3>
          <div>
            <button type='submit' className='button btn col'>
              Submit
            </button>
            <button type='reset' className='button btn col'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewGoal;
