import React from 'react';

class MapJob extends React.Component {
  constructor(props) {
    super(props);
    this.googleMapRef = React.createRef();
    this.createGoogleMap = this.createGoogleMap.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.map = null;
    this.state = {
      openMarkerId: ''
    };
    this.handleToggleClose = this.handleToggleClose.bind(this);
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
    this.createCenterButton = this.createCenterButton.bind(this);
    this.centerMap = this.centerMap.bind(this);
  }

  componentDidMount() {
    this.props.setView('Map');
    this.createGoogleMap();
    this.createMarker();
  }

  handleToggleOpen(markerId) {
    this.setState({
      openMarkerId: markerId
    });
  }

  handleToggleClose() {
    this.setState({
      openMarkerId: ''
    });
  }

  createGoogleMap() {
    let coordinate = { lat: 33.683414, lng: -117 };

    if (this.props.savedJobs !== undefined) {
      if (this.props.savedJobs.length !== 0) {
        const jobInfo = this.props.savedJobs[0].job_info;
        coordinate = { lat: jobInfo.latitude, lng: jobInfo.longitude };
      }
    }
    // eslint-disable-next-line no-undef
    this.map = new google.maps.Map(this.googleMapRef.current, {
      center: coordinate,
      zoom: 12,
      disableDefaultUI: true
    });
  }

  createMarker() {
    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds();
    const jobs = this.props.savedJobs;
    const allJobs = [];
    if (jobs !== undefined) {
      for (let i = 0; i < jobs.length; i++) {
        allJobs.push(jobs[i].job_info);
      }
    }
    for (let i = 0; i < allJobs.length; i++) {
      const currentJob = allJobs[i];
      // eslint-disable-next-line no-prototype-builtins
      if (currentJob.hasOwnProperty('latitude') && currentJob.hasOwnProperty('longitude')) {
      // eslint-disable-next-line no-undef
        const infowindow = new google.maps.InfoWindow({
          content: `<p class='text-center font-weight-bold'>${currentJob.company}</p>
         <p>${currentJob.title}</p> <p>${currentJob.description}</p>`
        });
        // eslint-disable-next-line no-undef
        const marker = new google.maps.Marker({
          position: { lat: currentJob.latitude, lng: currentJob.longitude },
          map: this.map,
          title: currentJob.company
        });
        marker.addListener('click', function () {
          infowindow.open(this.map, marker);
        });
        this.map.addListener('click', function () {
          infowindow.close(this.map, marker);
        });
        bounds.extend(marker.position);
      }
      if (this.props.savedJobs[0] !== undefined) {
        this.map.fitBounds(bounds);
      }
    }
  }

  createCenterButton() {
    if (this.props.savedJobs !== undefined) {
      return (
        <>
          <div className='centerButtons-row d-flex flex-wrap row justify-content-around mx-auto scroll'>
            {this.props.savedJobs.map((job, index) => {
              const words = job.job_info.company.split(' ');
              // eslint-disable-next-line no-prototype-builtins
              if (job.job_info.hasOwnProperty('latitude') && job.job_info.hasOwnProperty('longitude')) {
                return (
                  <button onClick={() => this.centerMap(job.job_info.latitude, job.job_info.longitude)} key={index} className='centerButton bg-grey col-3 p-1 m-2'>
                    {words[0]}
                  </button>
                );
              }
            })}
          </div>
        </>
      );
    }
  }

  centerMap(lat, lng) {
    this.map.setCenter({ lat: lat, lng: lng });
    this.map.setZoom(15);
  }

  render() {
    if (this.map) {
      this.createMarker();
    }
    const centerButton = this.createCenterButton();
    return (
      <div className='d-flex flex-column align-items-center mt-5 pt-3'>
        <div ref={this.googleMapRef} className='mapJobs'></div>
        {centerButton}
      </div>
    );
  }
}

export default MapJob;
