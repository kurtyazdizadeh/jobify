/* eslint-disable no-unused-vars */
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
import AddNewGoal from './add-new-goal';

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
    this.postGoal = this.postGoal.bind(this);
    this.saveJob = this.saveJob.bind(this);
    this.plusGoal = this.plusGoal.bind(this);
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

  saveJob(event, props) {
    const heart = event.target;
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props)
    };

    fetch('/api/save-job', params)
      .then(res => res.json())
      .then(job => {
        heart.className = 'fas fa-heart like-button';
        const jobs = this.state.savedJobs.slice();
        jobs.push(job.rows[0]);
        this.setState({ savedJobs: jobs });
      })
      .catch(err => console.error(err));
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

  postGoal(newGoal) {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGoal)
    };
    fetch('/api/goals', request)
      .then(response => response.json())
      .then(data => {
        const goal = this.state.goals.slice();
        goal.push(data.rows[0]);

        this.setState({ goals: goal });
      });
  }

  plusGoal(id) {
    const updateGoal = this.state.goals.find(goal => goal.user_goal_id === id);
    if (updateGoal.current_progress < updateGoal.end_goal) {
      updateGoal.current_progress++;
      const request = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateGoal)
      };
      fetch('/api/goals', request)
        .then(response => response.json())
        .then(data => {
          const goals = this.state.goals.slice();
          const index = goals.findIndex(goals => goals.id === id);
          goals[index] = data.row;
          this.setState({
            goals: goals
          });
        });
    }
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
          <Route path="/goals/add"
            render={props =>
              <AddNewGoal {...props}
                setView={this.setView}
                onSubmit={this.postGoal}
              />} />
          <Route path="/goals"
            render={props =>
              <Goals {...props}
                goals={goals}
                setView={this.setView}
                plusGoal={this.plusGoal}
              />} />
          <Route path="/add-job"
            render={props =>
              <AddNewJob {...props}
                setView={this.setView}
              />} />
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
              />} />
          <Route path="/search/results"
            render={props =>
              <SearchResults {...props}
                setView={this.setView}
                searchQuery={params}
                saveJob={this.saveJob}
              />} />
          <Route path="/search"
            render={props =>
              <JobSearch {...props}
                setView={this.setView}
              />} />
          <Route path="/details/notes/:id"
            render={props =>
              <SpecificJobNotes {...props}
                date={this.manipulateDate}
                params={params}
                setView={this.setView}
              />} />
          <Route path="/details/docs/:id"
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
                getSavedJobs={this.getSavedJobs}
              />} />
        </Switch>
        <FooterMenu setView={this.setView} />
      </div>
    );
  }
}
