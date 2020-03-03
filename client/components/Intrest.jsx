import React from "react";
import { withRouter } from "react-router-dom";

class Intrests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intrests: []
        }
    }

    handleChange = (e) => {
        let { value } = e.target
        this.setState({
            intrests: [...this.state.intrests, value]
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/v1/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                intrests: this.state.intrests
            })
        }).then(res => res.json()).then(res => {
            this.props.history.push("/userhome");
        });
    }

    render() {
        return(
            <div>
                <h2>Hi {this.props.user.username}! Select your intrests</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="button" name="intrest-1" value="Intrest 1" onClick={this.handleChange}/>
                    <input type="button" name="intrest-2" value="Intrest 2" onClick={this.handleChange}/>
                    <input type="button" name="intrest-3" value="Intrest 3" onClick={this.handleChange}/>
                    <input type="button" name="intrest-4" value="Intrest 4" onClick={this.handleChange}/>
                    <input type="submit" value="Next" />
                </form>
            </div>
        );
    }
}

export default withRouter(Intrests);