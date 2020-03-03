import React, { Component } from 'react'
import { withRouter } from "react-router-dom";


class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      otp: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/v1/users/${localStorage.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    }).then(res => res.json()).then(res => {
      if(this.state.otp == res.user.otp) {
        fetch(`api/v1/users/verifyuser/${localStorage.userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          this.props.history.push("/signin");
        })
      } else {
        console.log(this.state.otp, res.user.otp);
        this.props.history.push("/");
      }
    })
  }

  render(){
    return(
      <div>
        <h2>Enter 5 digit verification OTP sent to your mail.</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="number" name="otp" value={this.state.otp} onChange={this.handleChange}  />
          <button type="submit">Verify</button>
        </form>
      </div>
    );
  }
}

export default withRouter(EmailVerification);