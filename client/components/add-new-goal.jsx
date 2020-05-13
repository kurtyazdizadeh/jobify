import React from 'react';
import { withRouter } from 'react-router-dom';

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
    this.props.history.push('/goals');
    this.props.setView('Goals');
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
    const formRowClasses = 'form-group d-flex flex-column align-items-center p-3';
    return (
      <>
        <form className='mt-5 pt-3 align-middle text-center' onSubmit={this.handleSubmit}>
          <div className={formRowClasses}>
            <label htmlFor="title">Goal Title:</label>
            <input
              id='title'
              className='text form-control light-gray'
              type="text"
              name='title'
              size='30'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className={formRowClasses}>
            <label htmlFor="type">Goal Type:</label>
            <input
              id='type'
              className='text form-control light-gray'
              type="text"
              name='type'
              size='30'
              value={this.state.type}
              onChange={this.handleChange}
            />
          </div>
          <div className={formRowClasses}>
            <label htmlFor="endGoal">Goal End Goal:</label>
            <input
              id='endGoal'
              className='text form-control light-gray'
              type="number"
              name='endGoal'
              size='30'
              value={this.state.endGoal}
              onChange={this.handleChange}
            />
          </div>
          <button type='submit' className='btn button bg-grey col'>
              Submit
          </button>
          <button type='reset' className='btn button bg-grey col'>
              Cancel
          </button>
        </form>
      </>
    );
  }
}

export default withRouter(AddNewGoal);
