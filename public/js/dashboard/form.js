var Trip = React.createClass({
    getInitialState() {
        if (this.props.editTrip.hasOwnProperty('name')) {
            return {
                trip: this.props.editTrip,
                photoModal: false,
            };
        } else {
            return {
                trip: {
                    name: '',
                    photo: '',
                    description: '',
                    address: '',
                    lat: '',
                    long: '',
                    routes: [],
                },
                photoModal: false,
            };
        }
    },
    
    handleChange(e) {
        var property = e.target.name;
        var value = e.target.value;
        var trip = this.state.trip;
        trip[property] = value;
        this.setState({
            trip: trip
        });
    },
    
    togglePhotoModal() {
        this.setState({
            photoModal: !this.state.photoModal
        });
    },
    
    addRoute() {
        var name = this.refs.route.value;
        var address = this.refs.address.value;
        var route = {
            name: name,
            address: address,
        };
        var trip = this.state.trip;
        trip.routes.concat(route);
        this.setState({
            trip: trip
        });
    },
    
    handleAdd() {
        var trip = this.state.trip;
        this.props.handleAdd(trip);
    },
    
    submitEdit() {
        this.props.submitEdit(this.state.trip);
    },
    
    selectPhoto(photo) {
        var trip = this.state.trip;
        trip.photo = photo.url;
        this.setState({
            trip: trip
        });
    },

    render() {
        var trip = this.state.trip;
        if (trip.routes.length != 0) {
            var routes = trip.routes.map(function(route, id) {
                return (
                    <li key={id}>{route.name}</li>
                );
            });
        }
        return (
            <div className="">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" name="name" type="text" onChange={this.handleChange} value={trip.name} />
                </div>
                <label className="label">Photo</label>
                <div className="control">
                    { trip.photo !== '' ? <img src={trip.photo} /> : '' }
                    <input className="input" name="photo" type="text" onChange={this.handleChange} value={trip.photo} />
                    <button className="button" onClick={this.togglePhotoModal}>Select Photo</button>
                </div>
                <label className="label">Description</label>
                <div className="control">
                    <textarea className="textarea" name="description" onChange={this.handleChange} value={trip.description}></textarea>
                </div>
                <label className="label">Address</label>
                <div className="control">
                    <input className="input" name="address" type="text" onChange={this.handleChange} value={trip.address} />
                </div>
                <label className="label">Coordinate</label>
                <div className="control is-grouped">
                    <label className="label">Latitude</label>
                    <div className="control is-expanded">
                        <input className="input" name="lat" type="text" onChange={this.handleChange} value={trip.lat} />
                    </div>
                    <label className="label">Longitude</label>
                    <div className="control is-expanded">
                        <input className="input" name="long" type="text" onChange={this.handleChange} value={trip.long} />
                    </div>
                </div>
                
                <label className="label">Routes</label>
                <div className="control column is-half is-offset-one-quarter">
                    {routes}
                    <label className="label">Name</label>
                    <input className="input" ref="route" name="route" type="text" />
                    <label className="label">address</label>
                    <input className="input" ref="address" name="address" type="text" />
                    <button className="button" onClick={this.addRoute}>Add Route</button>
                </div>
                
                <div className="control is-grouped">
                    <div className="control">
                        { (this.props.editTrip.hasOwnProperty('name')) ?
                        <button className="button is-primary" onClick={this.submitEdit}>Edit</button>
                        : 
                        <button className="button is-primary" onClick={this.handleAdd}>Add</button>
                        }
                    </div>
                </div>
                { (this.state.photoModal === true) ?
                <Photo photoModal={this.state.photoModal} selectPhoto={this.selectPhoto} togglePhotoModal={this.togglePhotoModal} />
                : '' }
            </div>
        );
    }
});