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
  }

  componentDidMount() {
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

    if (this.props.savedJobs[0] !== undefined) {
      const jobInfo = this.props.savedJobs[0].job_info;
      coordinate = { lat: jobInfo.latitude, lng: jobInfo.longitude };
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
    for (let i = 0; i < jobs.length; i++) {
      allJobs.push(jobs[i].job_info);
    }
    for (let i = 0; i < allJobs.length; i++) {
      const currentJob = allJobs[i];
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

  render() {
    return (
      <div className='d-flex flex-column align-items-center'>
        <h1 className='mt-5'>Your Jobs</h1>
        <div ref={this.googleMapRef} className='mapJobs'></div>
      </div>
    );
  }
}

export default MapJob;
