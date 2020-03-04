import React from "react";
import {Link, withRouter} from "react-router-dom";
import validator from "validator";
import UploadImage from "./UploadImage";
 
class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            username:""
        }
    }
    handleChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
      };

    handleSubmit = e => {
        e.preventDefault();
        if (validator.isEmail(this.state.email)) {
          fetch('http://localhost:3000/api/v1/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              username:this.state.username
            })
          })
            .then(res => res.json())
            .then(data => {
              if(data.user) {
                localStorage.setItem("userId", data.user._id);
                localStorage.setItem("token", data.token);
                this.props.history.push("/emailverification");
              }
        });
    } else {
      alert('enter valid details');
    }
  };
    render(){
        return(
            <div className="main-sign">
              <center>
               <form className="signup">
      <div className="form-group signin">
       
        <input type="email" className="form-control em" id="exampleInputEmail1" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} aria-describedby="emailHelp"/>
        
      </div>
      <div className="form-group signin">
      
        <input type="password" className="form-control em" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} id="exampleInputPassword1"/>
      </div>
    

      <input type="email" className="form-control signin em" id="exampleInputEmail1" placeholder="Full name" name="username" value={this.state.username} onChange={this.handleChange} aria-describedby="emailHelp"/>

      <div className="form-group form-check signin">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label ch" for="exampleCheck1">I agree to all terms and conditions</label>
      </div>
      <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btsign">Sign Up</button>
    </form>
    {/* <Link to="/emailverification">Verify Email</Link> */}
    <p>Already a member ? <span><Link  to="/signin"> sign in</Link></span></p>
    </center>
    <UploadImage className="upload"/>

            </div>
        )
    }
    
}
export default withRouter(Signup);