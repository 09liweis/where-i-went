var List = React.createClass({
    handleDelete(id) {
        this.props.handleDelete(id);
    },
    
    handleEdit(trip) {
        this.props.handleEdit(trip);
    },

    render() {
        var _this = this;
        var trips = this.props.trips.map(function(trip, id) {
            return (
                <tr key={id}>
                    <th>{trip.name}</th>
                    <th>
                        <button className="button is-danger is-hovered" onClick={_this.handleEdit.bind(_this, trip)}>Edit</button>
                        <button className="button is-danger is-hovered" onClick={_this.handleDelete.bind(_this, trip._id)}>Delete</button>
                    </th>
                </tr>
            );
        });
        return (
            <table className="table">
                <thead>
                <tr>
                    <th><abbr title="Position">Name</abbr></th>
                    <th><abbr title="Played">Action</abbr></th>
                </tr>
              </thead>
              <tbody>
              {trips}
              </tbody>
            </table>
        );   
    }
});