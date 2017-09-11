import React from 'react';

var Map = React.createClass({
    getInitialState() {
        return {
            search: 'Toronto Public Library',
            map: '',
            service: ''
        };
    },
    componentDidMount() {
        var _this = this; 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                var p = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                };
                if (_this.state.map == '') {
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                        zoom: 10
                    });
                    _this.setState({map: map});
                }
            });
        }
    },
    handleChange(e) {
        this.setState({
            search: e.target.value 
        });
    },
    search(e) {
        e.preventDefault();
        var request = {
            query: this.state.search
        };
        var service = new google.maps.places.PlacesService(this.state.map);
        this.setState({service: service});
        service.textSearch(request, this.renderMarker);
    },
    renderMarker(results, status) {
        var bounds = new google.maps.LatLngBounds();
        var _this = this;
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.map(function(place) {
                var marker = new google.maps.Marker({
                    map: _this.state.map,
                    position: place.geometry.location,
                    data: place
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    _this.state.service.getDetails(place, function(result, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            _this.props.renderLocationOnForm(result);
                        }
                    });
                });
                
                bounds.extend(place.geometry.location);
            });
            _this.state.map.fitBounds(bounds);
        }
    },
    render() {
        return (
            <div>
                <form>
                    <label className="label">location</label>
                    <div className="control">
                        <input className="input" name="location" type="text" onChange={this.handleChange} />
                    </div>
                    <input type="submit" className="button is-primary" onClick={this.search} />
                </form>
                <div id="map" style={{height: '400px'}}>
                </div>
            </div>
        );
    }
});
export default Map;