var Login = React.createClass({
    getInitialState() {
        return {
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
    
    handleLogin(e) {
        e.preventDefault();
        var _this = this;
        $.ajax({
            url: '/user/login',
            type: 'POST',
            data: _this.state,
            dataType: "json",
            complete: function() {
              //called when complete
              console.log('process complete');
            },

            success: function(data) {
              console.log(data);
              window.location = '/user/dashboard';
           },

            error: function() {
              console.log('process error');
            },
        });
    },

    render() {
        return (
            <form className="container" onSubmit={this.handleLogin}>
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
                    <input type="submit" className="button is-primary" value="Login" />
                  </p>
                </div>
            </form>
        );
    }
});

ReactDOM.render(<Login />, document.getElementById('login'));