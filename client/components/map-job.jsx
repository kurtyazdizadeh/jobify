import React from 'react';

class MapJob extends React.Component {
  constructor(props) {
    super(props);
    this.googleMapRef = React.createRef();
    this.createGoogleMap = this.createGoogleMap.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.map = null;
  }

  componentDidMount() {
    this.createGoogleMap();
    this.createMarker();
  }

  createGoogleMap() {
    let coordinate = { lat: 33.683414, lng: -100 };

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
      allJobs.push({ lat: jobs[i].job_info.latitude, lng: jobs[i].job_info.longitude, company: jobs[i].job_info.company });
    }
    for (let i = 0; i < allJobs.length; i++) {
      const currentJob = allJobs[i];
      // eslint-disable-next-line no-undef
      this.marker = new google.maps.Marker({
        position: { lat: currentJob.lat, lng: currentJob.lng },
        map: this.map,
        title: currentJob.company
      });
      if (this.props.savedJobs[0] !== undefined) {
        bounds.extend(this.marker.position);
      }
    }
    this.map.fitBounds(bounds);
  }

  render() {
    return (
      <div className='d-flex flex-column align-items-center'>
        <h1 className='mt-5'>Google Maps</h1>
        <div ref={this.googleMapRef} className='mapJobs'></div>
      </div>
    );
  }
}

export default MapJob;
