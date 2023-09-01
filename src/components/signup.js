import React from 'react';
import TextField from '@mui/material/TextField';
import { Link,Button } from '@mui/material';
import './styles.css';

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {
        username: '',
        emailid: '',
        password: '',
        confirmpassword: '',
      };
      this.setState({ fields,errors:{} });
      alert('Form submitted');
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      // Regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+))|("[\w-\s]+")([\w-]+(?:\.[\w-]+)))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    if (!fields.confirmpassword) {
      formIsValid = false;
      errors.confirmpassword = '*Please enter your password confirmation.';
    } else if (fields.password !== fields.confirmpassword) {
      formIsValid = false;
      errors.confirmpassword = '*Password and Confirm Password do not match.';
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div id="main-registration-container">
        <div className="register">
        <center><h2>Create Account</h2></center>
          <form
            method="post"
            name="userRegistrationForm"
            onSubmit={this.submituserRegistrationForm}
          >
            <TextField
              //required
              id="username"
              label="Username"
              type="text"
              name="username"
              value={this.state.fields.username}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.username}</div>
            <br></br>
            <TextField
              //required
              id="emailid"
              label="E-mail"
              type="text"
              name="emailid"
              value={this.state.fields.emailid}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.emailid}</div>
            <br></br>
            <TextField
             // required
              id="password"
              label="Password"
              type="password"
              name="password"
              value={this.state.fields.password}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.password}</div>
            <br></br>
            <TextField
              //required
              id="confirmpassword"
              label="Confirm Password"
              type="password"
              name="confirmpassword"
              value={this.state.fields.confirmpassword}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.confirmpassword}</div>
            <p>By Clicking on create account you agree to our <b>User Agreement</b>,<b>Privacy Policy</b> and <b>Cookies Settings</b></p>
            <center>
            <Button variant="contained" type="submit" color="success">
              CREATE ACCOUNT
            </Button></center>
          </form>
          <br></br>
          <p>Already have an account?<Link href="/components/login">Login</Link></p>
        </div>
      </div>
    );
  }
}

export default RegisterForm;