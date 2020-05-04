import React from 'react';
import JobListingItem from './job-listing-item';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      resultsPage: 1
    };
  }

  componentDidMount() {
    this.searchForJobs();
  }

  searchForJobs() {
    const { desiredPosition, location, distance, jobType } = this.props.searchQuery;

    const params = {
      app_id: adzunaID,
      app_key: adzunaKEY,
      results_per_page: 10,
      title_only: desiredPosition,
      where: location,
      distance: Math.round(distance * 1.60934)
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

    fetch(`https://api.adzuna.com/v1/api/jobs/us/search/${this.state.resultsPage}?` + new URLSearchParams(params))
      .then(res => res.json())
      .then(listings => {
        console.log(listings);
        const newState = {
          searchResults: listings.results
        };
        // come back to this for pagination on search results...
        // this will prep for calling API with next page
        if (listings.count > 10) {
          newState.resultsPage = this.state.resultsPage + 1;
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
      const state = location.area[1];

      let title = listing.title;
      title = title.replace(/(<([^>]+)>)/ig, '');

      return (
        <JobListingItem
          key={id}
          id={id}
          url={redirect_url}
          title={title}
          city={city}
          state={state}
          latitude={latitude}
          longitude={longitude}
          description={description}
        />
      );
    });

    return jobListingElements;
  }

  render() {
    return (
      this.state.searchResults.length
        ? <div className="mt-5 p-3">
            Search Results
          <br/>
          {this.renderJobListings()}
        </div>
        : <div className="mt-5 p-3">Loading...</div>
    );
  }
}

export default SearchResults;
