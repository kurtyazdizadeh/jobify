import React from 'react';

class MapJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedJobs: []
    };
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
    // eslint-disable-next-line no-undef
    this.map = new google.maps.Map(this.googleMapRef.current, {
      center: { lat: -34.397, lng: 150 },
      zoom: 8
    });
  }

  createMarker() {
    // eslint-disable-next-line no-undef
    this.marker = new google.maps.Marker({
      position: { lat: -34.397, lng: 150 },
      map: this.map,
      title: 'testing'
    });
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
