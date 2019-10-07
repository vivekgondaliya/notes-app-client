import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import LoaderButton from '../components/LoaderButton';
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({isLoading: true});
    try {
      //1. call your login service here
      // Auth.signIn(this.state.email, this.state.password)
      //2. on successful login update userAuthenticaiton via <AppliedRoutes>
      //this.props.userHasAuthenticated(true);
      //3. redirect to Home on Login
      //this.props.history.push("/");
    } catch (error) {
        alert(e.message);
        this.setState({isLoading: false})
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />

        </form>
      </div>
    );
  }
}
