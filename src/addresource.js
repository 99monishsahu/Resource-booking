import React, { Component } from "react";
import axios from "axios";
import tata from "./tata.png";

export default class AddResource extends Component {
  constructor(props) {
    super(props);

    this.onChangeAddResource = this.onChangeAddResource.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      resource_name: "",
      status: "Inactive",
      resourcexyz: []
    };
  }

  onChangeAddResource(e) {
    this.setState({
      resource_name: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Resource Added`);
    console.log(`Resource Name : ${this.state.resource_name}`);

    const newResource = {
      resource_name: this.state.resource_name,
      status: this.state.status
    };

    axios
      .post("http://localhost:4000/resourcexyz/add", newResource)
      .then(res => console.log(res.data));

    this.setState({
      resource_name: "",
      status: "Inactive"
    });
  }

  render() {
    return (
      <div className="card card-container">
        <img
          src={tata}
          id="profile-img"
          className="profile-img-card"
          alt="Tata-steel-Logo"
        />
        <br />
        <form className="form-signin" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Enter a Resource Name"
            className="form-control"
            value={this.state.resource_name}
            onChange={this.onChangeAddResource}
            required
          />

          <div className="form-group">
            <input
              className="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
              value="Add Resource"
            />
          </div>
        </form>
      </div>
    );
  }
}
