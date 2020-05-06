import React from 'react';
// eslint-disable-next-line no-unused-vars
import YourJobs from './your-jobs';
import ExpandedNotes from './expanded-notes';
import JobSearch from './job-search';
import SearchResults from './search-results';
import Header from './header';
import FooterMenu from './footer-menu';
import UploadFiles from './upload-files';
import SpecificJobNotes from './specific-job-notes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'Home',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  manipulateDate(date) {
    const convertedDate = new Date(date.slice(0, 10));
    return convertedDate.toLocaleDateString('en-US');
  }

  renderView() {
    const { name, params } = this.state.view;

    if (name === 'Job Search') {
      return <JobSearch setView={this.setView}/>;
    }
    if (name === 'Home') {
      return <YourJobs setView={this.setView} />;
    }
    if (name === 'Profile') {
      return <h1 className='mt-5'>Profile in progress</h1>;
    }
    if (name === 'Job Detail') {
      return <ExpandedNotes
        date={this.manipulateDate}
        params={this.state.view.params}
        setView={this.setView}/>;
    }
    if (name === 'Map') {
      return <h1 className='mt-5'>Map in progress</h1>;
    }
    if (name === 'Note') {
      return <SpecificJobNotes
        date={this.manipulateDate}
        params={this.state.view.params}/>;
    }
    if (name === 'Goal') {
      return <h1 className='mt-5'>Goal in progress</h1>;
    }
    if (name === 'Search Results') {
      return (
        <SearchResults
          setView={this.setView}
          searchQuery={params}
        />
      );
    }
    if (name === 'Upload Files') {
      return (
        <UploadFiles
          setView={this.setView}/>
      );
    }

  }

  render() {
    // return this.state.isLoading
    //   ? <h1>Testing connections...</h1>
    //   : <h1>{this.state.message.toUpperCase()}</h1>;
    return (

      <div>

        <Header title={this.state.view.name} setView={this.setView}/>
        {this.renderView()}
        <FooterMenu setView={this.setView}/>
      </div>
    );
  }
}
