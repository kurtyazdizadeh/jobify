import React from 'react';
import YourJobs from './your-jobs';
import ExpandedNotes from './expanded-notes';
import Header from './header';
import FooterMenu from './footer-menu';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    // return this.state.isLoading
    //   ? <h1>Testing connections...</h1>
    //   : <h1>{this.state.message.toUpperCase()}</h1>;
    return (
      <div>
        <Header title="Job Search"/>;
        <YourJobs />
        <FooterMenu />
      </div>
    );
  }
}
