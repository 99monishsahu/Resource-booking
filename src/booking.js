import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const emailRegex = RegExp(/^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/);
const dateRegex = RegExp(
  /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((1[6-9]|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class Booking extends Component {
  constructor(props) {
    super(props);

    this.onChangeResName = this.onChangeResName.bind(this);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangePersonNumber = this.onChangePersonNumber.bind(this);
    this.onChangePersonEmail = this.onChangePersonEmail.bind(this);
    this.onChangeBookingStart = this.onChangeBookingStart.bind(this);
    this.onChangeBookingEnd = this.onChangeBookingEnd.bind(this);
    this.onSubmitt = this.onSubmitt.bind(this);

    this.state = {
      res_name: "",
      userId: `${this.props.match.params.id}`,
      person_name: "",
      person_number: "",
      person_email: "",
      booking_date_start: "",
      booking_date_end: "",
      status: "Active",
      formErrors: {
        startdate: "",
        enddate: "",
        email: ""
      },
      infos: [],
      resourcexyz: []
    };
  }

  onChangeResName(e) {
    this.setState({
      res_name: e.target.value
    });
  }

  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }

  onChangePersonNumber(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({
        person_number: e.target.value
      });
    }
  }

  onChangePersonEmail(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "**Invalid E-mail address**";
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      person_email: e.target.value
    });
  }

  onChangeBookingStart(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "startdate":
        formErrors.startdate = dateRegex.test(value)
          ? ""
          : "**Invalid Date or Date Format**";
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      booking_date_start: e.target.value
    });
  }

  onChangeBookingEnd(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "enddate":
        formErrors.enddate = dateRegex.test(value)
          ? ""
          : "**Invalid Date or Date Format**";
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      booking_date_end: e.target.value
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/resourcexyz/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            resourcexyz: response.data.map(
              currentTodo => currentTodo.resource_name
            ),
            res_name: response.data[0].resource_name
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmitt(e) {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`Details Added`);
      console.log(`Resource Name : ${this.state.res_name}`);
      console.log(`User ID :${this.props.match.params.id}`);
      console.log(`Person Name : ${this.state.person_name}`);
      console.log(`Person Number : ${this.state.person_number}`);
      console.log(`Person Email : ${this.state.person_email}`);
      console.log(`Booking Date - Start : ${this.state.booking_date_start}`);
      console.log(`Booking Date - End : ${this.state.booking_date_end}`);

      const newDetails = {
        userId: this.state.userId,
        res_name: this.state.res_name,
        person_name: this.state.person_name,
        person_number: this.state.person_number,
        person_email: this.state.person_email,
        booking_date_start: this.state.booking_date_start,
        booking_date_end: this.state.booking_date_end
      };

      const newStatus = {
        status: this.state.status
      };

      axios
        .post("http://localhost:4000/infos/info", newDetails)
        .then(res => console.log(res.data));

      axios
        .post(
          "http://localhost:4000/resourcexyz/update/" +
            this.props.match.params.id,
          newStatus
        )
        .then(res => console.log(res.data));

      this.setState({
        person_name: "",
        person_number: "",
        person_email: "",
        booking_date_start: "",
        booking_date_end: ""
      });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="user">
        <div className="user__header">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg"
            alt="logo"
          />
          <br />
          <h1 className="user__title">Enter your details here</h1>
        </div>

        <form className="form_booking" onSubmit={this.onSubmitt}>
          <div className="form__group">
            <select
              ref="userInput"
              required
              className="form__input"
              value={this.state.res_name}
              onChange={this.onChangeResName}
            >
              {this.state.resourcexyz.map(function(currentTodo) {
                return (
                  <option key={currentTodo} value={currentTodo}>
                    {currentTodo}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form__group">
            <input
              type="text"
              placeholder="Name"
              className="form__input"
              value={this.state.person_name}
              onChange={this.onChangePersonName}
              required
            />
          </div>

          <div className="form__group">
            <input
              type="email"
              placeholder="Email"
              className="form__input"
              value={this.state.person_email}
              name="email"
              onChange={this.onChangePersonEmail}
              required
            />
            {formErrors.email.length > 0 && (
              <span className="form__input" style={{ color: "red" }}>
                {formErrors.email}
              </span>
            )}
          </div>

          <div className="form__group">
            <input
              type="text"
              placeholder="Mobile Number"
              className="form__input"
              maxLength="10"
              minLength="10"
              onChange={this.onChangePersonNumber}
              value={this.state.person_number}
              required
            />
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Book from : dd/mm/yyyy"
              name="startdate"
              onChange={this.onChangeBookingStart}
              value={this.state.booking_date_start}
              required
            />
            {formErrors.startdate.length > 0 && (
              <span className="form__input" style={{ color: "red" }}>
                {formErrors.startdate}
              </span>
            )}
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Book till : dd/mm/yyyy"
              name="enddate"
              onChange={this.onChangeBookingEnd}
              value={this.state.booking_date_end}
              required
            />
            {formErrors.enddate.length > 0 && (
              <span className="form__input" style={{ color: "red" }}>
                {formErrors.enddate}
              </span>
            )}
          </div>

          <button className="btn_booking">Register</button>

          <Link to="/list">
            <button className="btn_booking">Back</button>
          </Link>
        </form>
      </div>
    );
  }
}
