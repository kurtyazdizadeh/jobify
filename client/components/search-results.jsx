import React from 'react';
import JobListingItem from './job-listing-item';

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
    this.searchForJobs(this.state.resultsPage);
  }

  searchView() {
    this.props.setView('Job Search', {});
  }

  searchForJobs(resultsPage) {
    const { desiredPosition, location, distance, jobType } = this.props.searchQuery;

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

    const query = new URLSearchParams(params);

    fetch(`/api/search-jobs/${query}`)
      .then(res => res.json())
      .then(listings => {
        const newState = {
          searchResults: listings.results
        };
        if (listings.count > 10) {
          newState.resultsPage = resultsPage;
          if (!newState.maxPage) {
            newState.maxPage = Math.ceil(listings.count / 10);
          }
        }
        if (listings.count === 0) {
          newState.noResults = true;
        }
        this.setState(newState);
      })
      .catch(err => console.error(err));
  }

  renderJobListings() {
    const jobListingElements = this.state.searchResults.map(listing => {
      const { id, latitude, longitude, location, contract_time, redirect_url, description } = listing;

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
          url={redirect_url}
          title={title}
          company={company}
          city={city}
          state={state}
          county={county}
          contract={contract_time}
          latitude={latitude}
          longitude={longitude}
          description={description}
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
            <span>{`${resultsPage} of ${maxPage}`}</span>
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
              <button
                className="btn job-listing"
                onClick={this.searchView}>
                    Go Back
              </button>
            </div>
          </div>
          : <div className="mt-5 p-3 d-flex justify-content-center">
            <h5>Loading...</h5>
          </div>
    );
  }
}

export default SearchResults;
