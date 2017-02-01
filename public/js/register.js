var Register = React.createClass({
    getInitialState() {
        return {
            name: '',
            email: '',
            password: '',
        };
    },
    
    handleChange(e) {
        var value = e.target.value;
        var property = e.target.name;
        this.setState({
            [property]: value
        });
    },
    
    handleRegister(e) {
        e.preventDefault();
        var _this = this;
        $.ajax({
            url: '/user/register',
            type: 'POST',
            data: _this.state,
            dataType: "json",
            complete: function() {
              //called when complete
              console.log('process complete');
            },

            success: function(data) {
              console.log(data);
              window.location = '/user/login';
           },

            error: function() {
              console.log('process error');
            },
        });
    },

    render() {
        return (
            <form className="container" onSubmit={this.handleRegister}>
                <label className="label">Name</label>
                <p className="control">
                  <input className="input" name="name" type="text" onChange={this.handleChange} />
                </p>
                <label className="label">Email</label>
                <p className="control">
                  <input className="input" name="email" type="text" onChange={this.handleChange} />
                </p>
                <label className="label">Password</label>
                <p className="control">
                  <input className="input" name="password" type="password" onChange={this.handleChange} />
                </p>
                <div className="control is-grouped">
                  <p className="control">
                    <input type="submit" className="button is-primary" value="Register" />
                  </p>
                </div>
            </form>
        );
    }
});

ReactDOM.render(<Register />, document.getElementById('register'));