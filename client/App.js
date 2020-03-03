import React from "react";
import { Route, Switch } from 'react-router-dom';
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Userhome from "./components/Userhome";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../client/assets/stylesheets/sign.scss";

import EmailVerification from "./components/EmailVerification";
import Intrests from "./components/Intrest";

class App extends React.Component{
    constructor(){
        super();
        this.state={
            user:null
        }
    }

    componentDidMount() {
      fetch("/api/v1/users/current-user", {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          "Authorization": localStorage.token
        }
      }).then(res => res.json()).then(res => {
        this.setState({
          user: res.user
        });
      })
    }

    changeUser = (user) => {
        this.setState({
          user
        });
      }

    publicRoutes = () => {
        return (
          <Switch>
              <Route path="/signin">
                <Signin changeUser={this.changeUser}/>
              </Route>
              <Route path="/emailverification">
                <EmailVerification />
              </Route>
              <Route exact path="/">
                <Signup/>
              </Route>
          </Switch>
        );
      }


  privateRoutes = () => {
    return (
      <Switch>
        <Route path="/intrests">
          <Intrests user={this.state.user} />
        </Route>
        <Route path="/userhome">
          <Userhome user={this.state.user} />
        </Route>
      </Switch>
    );
  }
    render(){
        return(
            <div>
           {
          localStorage.token && this.state.user ? this.privateRoutes() : this.publicRoutes()
        }
            </div>
        )
    }
   
}
export default App; 