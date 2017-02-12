var Search = React.createClass({
    getInitialState() {
        return {
            search: '',
        };
    },
    handleChange(e) {
        this.setState({
            search: e.target.value 
        });
    },
    search(e) {
        e.preventDefault();
        var search = this.state.search.replace(' ', '+');
        var requestURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
        $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                query: search,
                key: 'AIzaSyD1aO6SHBdMTgsBbV_sn5WI8WVGl4DCu-k'
            },
            async: false,
            contentType: 'application/jsonp; charset=utf-8',
            success: function(data) {
                console.log(JSON.stringify(data));
            }
        });
        // $.getJSON(requestURL, function (data) {
        //     console.log(data);
        // });
    },
    render() {
        return (
            <form>
                <label className="label">location</label>
                <div className="control">
                    <input className="input" name="location" type="text" onChange={this.handleChange} />
                </div>
                <input type="submit" className="button is-primary" onClick={this.search} />
            </form>
        );
    }
});