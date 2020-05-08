import React from 'react';

class Goals extends React.Component {

  render() {
    return (
      <div className='d-flex flex-column align-items-center'>
        <h1 className='mt-5'>Goals in Progress</h1>
        <i onClick={() => this.props.setView('Add Goal', {})} className='fas fa-plus pointer mt-3'></i>
      </div>
    );
  }
}

export default Goals;
