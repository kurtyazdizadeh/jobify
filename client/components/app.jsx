import React from 'react';
import { Switch, Route } from 'react-router-dom';
import YourJobs from './your-jobs';
import JobDetails from './job-details';
import JobSearch from './job-search';
import SearchResults from './search-results';
import Header from './header';
import FooterMenu from './footer-menu';
import UploadFiles from './upload-files';
import MapJob from './map-job';
import AddNewJob from './add-new-job';
import SpecificJobNotes from './specific-job-notes';
import Notes from './notes';
import NotesView from './notes-view';
import Goals from './goals';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        savedJobs: [],
        name: 'Home',
        params: {}
      },
      goals: []
    };
    this.setView = this.setView.bind(this);
    this.getSavedJobs = this.getSavedJobs.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.getGoals = this.getGoals.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getSavedJobs('date_saved DESC');
    this.getGoals();
  }

  setView(name, params = {}) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getSavedJobs(order) {
    fetch(`/api/saved-job/${order}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          savedJobs: data
        });
      });
  }

  getGoals() {
    fetch('/api/goals')
      .then(res => res.json())
      .then(data => {
        this.setState({
          goals: data
        });
      });
  }

  deleteJob(userJobId) {
    const req = {
      method: 'DELETE'
    };

    fetch(`/api/saved-job/${userJobId}`, req);
    const newJobs = this.state.savedJobs.slice();
    const index = newJobs.findIndex(job => job.user_job_id === userJobId);
    newJobs.splice(index, 1);
    this.setState({ savedJobs: newJobs });
  }

  manipulateDate(date) {
    const convertedDate = new Date(date.slice(0, 10));
    return convertedDate.toLocaleDateString('en-US', { timeZone: 'Europe/Helsinki' });
  }

  renderView() {
    const { name, params } = this.state.view;

    switch (name) {
      case 'Add New Job':
        return <AddNewJob setView={this.setView} />;
      case 'Goal':
        return <Goals setView={this.setView} goals={this.state.goals}/>;
      case 'Home':
        return <YourJobs setView={this.setView} savedJobs={this.state.savedJobs} deleteJob={this.deleteJob} />;
      case 'Job Details':
        return <JobDetails
          date={this.manipulateDate}
          params={params}
          setView={this.setView} />;
      case 'Job Note':
        return <SpecificJobNotes
          date={this.manipulateDate}
          params={params}
          setView={this.setView} />;
      case 'Job Search':
        return <JobSearch setView={this.setView} />;
      case 'Map':
        return <MapJob savedJobs={this.state.savedJobs}/>;
      case 'Notes':
        return <Notes setView={this.setView} />;
      case 'View Notes':
        return <NotesView
          setView={this.setView}
          category={params}
          date={this.manipulateDate}
        />;
      case 'Profile':
        return <h1 className='mt-5'>Profile in progress</h1>;
      case 'Search Results':
        return <SearchResults
          setView={this.setView}
          searchQuery={params}
        />;
      case 'Documents':
        return <UploadFiles setView={this.setView} params={params} />;
      default:
    }

  }

  render() {
    const { name, params } = this.state.view;
    const { goals, savedJobs } = this.state;
    return (
      <div>
        <Header title={name} setView={this.setView} />
        <Switch>
          <Route path="/map"
            render={props =>
              <MapJob {...props}
                savedJobs={savedJobs}
                setView={this.setView}
              />} />
          <Route path="/goals"
            render={props =>
              <Goals {...props}
                goals={goals}
                setView={this.setView}
              />} />
          <Route path="/add-job"
            render={props =>
              <AddNewJob {...props}
                setView={this.setView}
              />}/>
          <Route path="/notes/:category"
            render={props =>
              <NotesView {...props}
                setView={this.setView}
                category={params}
                date={this.manipulateDate}
              />} />
          <Route path="/notes"
            render={props =>
              <Notes {...props}
                setView={this.setView}
              />}/>
          <Route path="/search/results"
            render={props =>
              <SearchResults {...props}
                setView={this.setView}
                searchQuery={params}
              />} />
          <Route path="/search"
            render={props =>
              <JobSearch {...props}
                setView={this.setView}
              />}/>
          <Route path="/details/notes/:id"
            render={props =>
              <SpecificJobNotes {...props}
                date={this.manipulateDate}
                params={params}
                setView={this.setView}
              />} />
          <Route path="/details/docs/:id/:company/:title"
            render={props =>
              <UploadFiles {...props}
                setView={this.setView}
                params={params}
              />} />
          <Route path="/details/:id"
            render={props =>
              <JobDetails {...props}
                date={this.manipulateDate}
                params={params}
                setView={this.setView}
              />} />
          <Route path="/"
            render={props =>
              <YourJobs {...props}
                savedJobs={savedJobs}
                deleteJob={this.deleteJob}
                setView={this.setView}
              />} />
        </Switch>
        {/* {this.renderView()} */}
        <FooterMenu setView={this.setView} />
      </div>
    );
  }
}
