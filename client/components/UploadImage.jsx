import React, { Component } from 'react';
import axios from "axios";

class UploadImage extends Component {
     
    constructor(props){
        super(props);

        this.state = {
            profileImage: ''
        }
    }

handleFileChange = (e) => {
    this.setState({ profileImage: e.target.files[0] })
}

handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('profileImage', this.state.profileImage)
    axios.post("/api/v1/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then(res => console.log(res))
}

render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Upload Profile Picture</h3>
                        <div className="form-group">
                            <input type="file" onChange={this.handleFileChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default UploadImage;