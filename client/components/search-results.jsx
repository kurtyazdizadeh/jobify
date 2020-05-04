import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  componentDidMount() {
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

    fetch('https://api.adzuna.com/v1/api/jobs/us/search/1?' + new URLSearchParams(params))
      .then(res => res.json())
      .then(listings => {
        this.setState({
          searchResults: listings.results
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      this.state.searchResults.length
        ? <div className="mt-5 p-3">Search Results</div>
        : <div className="mt-5 p-3">Loading...</div>
    );
  }
}

export default SearchResults;
