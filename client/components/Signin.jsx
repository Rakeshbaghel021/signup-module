import React from "react";
import { Link , withRouter} from 'react-router-dom';
import validator from "validator";
 
class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
    }

    handleChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
      };

    handleSubmit = e => {
        e.preventDefault();
        if (validator.isEmail(this.state.email)) {
          fetch('http://localhost:3000/api/v1/users/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
          })
            .then(res => res.json())
            .then(data => {
              localStorage.clear();
              localStorage.setItem("token", data.token);
              this.props.changeUser(data.user);
              this.props.history.push("/intrests");
        });
    } else {
      alert('enter valid details');
    }
  };
    render(){
        return(
            <div>
               <form onSubmit={this.handleSubmit}>
      <div className="form-group signin">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" aria-describedby="emailHelp"/>
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} id="exampleInputPassword1"/>
        <small id="emailHelp" className="form-text text-muted">forgot password ?</small>
        
      </div>
     
      <button type="submit" className="btn btn-primary">Sign in</button>
    </form>
    <p>New to the site <span><Link  to="/">sign up</Link></span></p>
            </div>
        )
    }
   
}
export default withRouter(Signin);