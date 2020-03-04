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
              <center>
               <form className="si" onSubmit={this.handleSubmit}>
      <div className="form-group signin">
        <input type="email" className="form-control em" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" aria-describedby="emailHelp"/>
      </div>
      <div className="form-group signin">
        <input type="password" className="form-control pass" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
        <small id="emailHelp" className="form-text text-muted">forgot password ?</small>
        
      </div>
     
      <button type="submit" className="btn btn-primary btsign">Sign in</button>
    </form>
    <p className="new">New to the site ? <span className="up"><Link  to="/">sign up</Link></span></p>
    </center>
            </div>
        )
    }
   
}
export default withRouter(Signin);