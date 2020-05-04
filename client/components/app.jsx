import React from 'react';
// eslint-disable-next-line no-unused-vars
import YourJobs from './your-jobs';
import ExpandedNotes from './expanded-notes';
import JobSearch from './job-search';
import SearchResults from './search-results';
import Header from './header';
import FooterMenu from './footer-menu';
import UploadFiles from './upload-files';

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

  renderView() {
    const { name, params } = this.state.view;

    if (name === 'Job Search') {
      return <JobSearch setView={this.setView}/>;
    }
    if (name === 'Home') {
      return <YourJobs setView={this.setView} />;
    }
    if (name === 'Job Detail') {
      return <ExpandedNotes params={this.state.view.params} setView={this.setView}/>;
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

        <Header title={this.state.view.name}/>
        {this.renderView()}
        <FooterMenu />
      </div>
    );
  }
}
