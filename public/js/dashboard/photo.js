//photo cms for upload and select photo
var Photo = React.createClass({
    getInitialState() {
        return {
            currentTab: 'list',
            photo: {
                url: '',
                title: '',
            },
            photos: []
        };
    },
    
    componentDidMount() {
        var _this = this;
        $.ajax({
            url: '/photo',
            type: 'GET',
            success: function(data) {
                _this.setState({
                    photos: data
                });
            }
        });
    },
    
    changeTab(e) {
        this.setState({
            currentTab: e.target.name
        });
    },
    
    renderActiveTab(tab) {
        return (this.state.currentTab == tab) ? 'is-active' : '';
    },
    
    handleChange(e) {
        var photo = this.state.photo;
        photo[e.target.name] = e.target.value;
        this.setState({
            photo: photo
        });
    },
    
    handleFile(e) {
        
    },
    
    upload() {
        var files = $('#file').get(0).files;
        var formData = new formData();
        for (var i=0; i < files.length; i++) {
            var file = files[i];
            formData.append('photos[]', file, file.name);
        }
    },
    
    add(e) {
        e.preventDefault();
        var photo = this.state.photo;
        $.ajax({
            url: '/photo/new',
            type: 'POST',
            data: photo,
            success: function(data) {

            }
        });
    },

    render() {
        var show = (this.props.photoModal === true) ? 'modal is-active' : 'modal';
        var _this = this;
        var photos = this.state.photos.map(function(photo) {
            return (
                <a key={photo._id} className="column is-3" onClick={_this.props.selectPhoto.bind(_this, photo)}>
                    <img src={photo.url} alt={photo.title} />
                </a>
            );
        });
        return (
            <div className={show}>
                <div className="modal-background" onClick={this.props.togglePhotoModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button className="delete" onClick={this.props.togglePhotoModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="tabs is-centered">
                            <ul>
                                <li className={this.renderActiveTab('list')}><a onClick={this.changeTab} name="list">List</a></li>
                                <li className={this.renderActiveTab('form')}><a onClick={this.changeTab} name="form">Add</a></li>
                            </ul>
                        </div>
                        { this.state.currentTab == "list" ?
                        <div className="columns">
                            {photos}
                        </div>
                        : "" }
                        { this.state.currentTab == "form" ?
                        <div id="photo-form">
                            <form onSubmit={this.upload} encType="multipart/form-data">
                                <input type="file" id="file" name="photos[]" multiple="multiple" onChange={this.handleFile} />
                                <input className='button is-primary' type="submit" value="Upload" />
                            </form>
                            <form onSubmit={this.add}>
                                <label className="label">Url</label>
                                <div className="control">
                                    <input className="input" name="url" type="text" onChange={this.handleChange} />
                                </div>
                                <label className="label">Title</label>
                                <div className="control">
                                    <input className="input" name="title" type="text" onChange={this.handleChange} />
                                </div>
                                <input className="button is-primary" type="submit" value="Add" />
                            </form>
                        </div>
                        : "" }
                    </section>
                    <footer className="modal-card-foot">
                        <a className="button is-primary">Save changes</a>
                        <a className="button" onClick={this.props.togglePhotoModal}>Cancel</a>
                    </footer>
                </div>
            </div>
        );
    },
});