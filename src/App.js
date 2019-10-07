import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Routes from "./Routes";

import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount(){
    try{
      //get current session and update the state
      // await Authorization call
      // this.userHasAuthenticated(true);
    }
    catch(e){
      if(e !== "No Current User"){
        alert(e);
      }
    }
    this.setState({'isAuthenticating' : false});
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  
  handleLogout = event => {
    //1. clear cookies or session before logout to avoid auto login on refresh
    //Auth.signOut()
    this.userHasAuthenticated(false);
    //2. redirect after logout
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }   
}

export default withRouter(App);

// The Fragment component can be thought of as a placeholder
// component. We need this because in the case the user is 
// not logged in, we want to render two links. To do this we
// would need to wrap it inside a single component, like a div.
// But by using the Fragment component it tells React that
// the two links are inside this component but we don’t want
// to render any extra HTML.


//Now if you refresh your page you should be logged out again.
//This is because we are not initializing the state from the
//browser session.