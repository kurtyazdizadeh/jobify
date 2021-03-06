import React from 'react';
import JobListingItem from './job-listing-item';
import { Link, withRouter } from 'react-router-dom';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noResults: false,
      searchResults: [],
      resultsPage: 1,
      maxPage: null
    };
    this.searchView = this.searchView.bind(this);
    this.handlePageNav = this.handlePageNav.bind(this);
  }

  componentDidMount() {
    const searchQuery = new URLSearchParams(this.props.location.search);
    const page = searchQuery.get('page');
    this.props.setView('Search Results');
    this.searchForJobs(parseInt(page));
  }

  searchView() {
    this.props.setView('Job Search');
  }

  searchForJobs(resultsPage) {
    const searchQuery = new URLSearchParams(this.props.location.search);

    const desiredPosition = searchQuery.get('desiredPosition');
    const location = searchQuery.get('location');
    const distance = searchQuery.get('distance');
    const jobType = searchQuery.get('jobType');
    searchQuery.set('page', resultsPage);

    const params = {
      pageNum: resultsPage,
      results_per_page: 10,
      title_only: desiredPosition,
      where: location,
      distance: Math.round(distance * 1.60934),
      sort_by: 'relevance'
    };

    switch (jobType) {
      case 'fullTime':
        params.full_time = 1;
        break;
      case 'partTime':
        params.part_time = 1;
        break;
      case 'contract':
        params.contract = 1;
        break;
      default:
        break;
    }

    const backendQuery = new URLSearchParams(params);

    fetch(`/api/search-jobs/${backendQuery}`)
      .then(res => res.json())
      .then(listings => {
        const newState = {
          searchResults: listings.results
        };
        if (listings.count > 10) {
          newState.resultsPage = resultsPage;
          if (!this.state.maxPage) {
            newState.maxPage = Math.ceil(listings.count / 10);
          }
        }
        if (listings.count === 0) {
          newState.noResults = true;
        }
        this.props.history.push(`/search/results?${searchQuery}`);
        this.setState(newState);
      })
      .catch(err => console.error(err));
  }

  renderJobListings() {
    const jobListingElements = this.state.searchResults.map(listing => {
      const { id, latitude, longitude, location, contract_time: contract, redirect_url: url, description } = listing;

      const company = listing.company.display_name;
      const city = location.area[3];
      const county = location.area[2];
      const state = location.area[1];

      let title = listing.title;
      title = title.replace(/(<([^>]+)>)/ig, '');

      return (
        <JobListingItem
          key={id}
          id={id}
          url={url}
          title={title}
          company={company}
          city={city}
          state={state}
          county={county}
          contract={contract}
          latitude={latitude}
          longitude={longitude}
          description={description}
          saveJob={this.props.saveJob}
        />
      );
    });

    return jobListingElements;
  }

  handlePageNav(event) {
    const { resultsPage, maxPage } = this.state;
    const { id } = event.target;

    if (id === 'next' && resultsPage !== maxPage) {
      this.searchForJobs(resultsPage + 1);
    } else if (id === 'prev' && resultsPage !== 1) {
      this.searchForJobs(resultsPage - 1);
    }
  }

  render() {
    const { searchResults, noResults, resultsPage, maxPage } = this.state;
    return (
      searchResults.length
        ? <div className="list-container my-5 p-2 pb-5">
          {this.renderJobListings()}
          <div className="search-pages d-flex justify-content-around align-items-center">
            <i
              className="fas fa-angle-left pointer"
              id="prev"
              onClick={this.handlePageNav}
            ></i>
            <span>{`${resultsPage} of ${maxPage || 1}`}</span>
            <i
              className="fas fa-angle-right pointer"
              id="next"
              onClick={this.handlePageNav}
            ></i>
          </div>
        </div>
        : noResults
          ? <div className="mt-5 p-3 d-flex flex-column align-items-center">
            <h5>No Results</h5>
            <div>
              <Link to="/search">
                <button
                  className="btn bg-grey"
                  onClick={() => this.props.setView('Search')}>
                      Go Back
                </button>
              </Link>
            </div>
          </div>
          : <div className="mt-5 p-3 d-flex justify-content-center">
            <h5>Loading...</h5>
          </div>
    );
  }
}

export default withRouter(SearchResults);
