import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = props => (
  <tr>
    <td>{props.todo.resource_name}</td>
    <td>{props.todo.status}</td>
    <td className="text-center">
      <Link to={"/details/" + props.todo._id}>
        <button className="btn btn-success btn-md">Book Now</button>
      </Link>
      &nbsp;&nbsp;
      <Link to={"/calendar/" + props.todo._id}>
        <button className="btn btn-info btn-xs" type="button">
          Show
        </button>
      </Link>
    </td>
  </tr>
);

var i;
for (i = 0; i < 2000000000; i++) {
  i++;
}

export default class ResourceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resourcexyz: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/resourcexyz/")
      .then(response => {
        this.setState({ resourcexyz: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  todoList() {
    return this.state.resourcexyz.map(function(currentTodo, i) {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div className="row">
        <table className="tbl">
          <thead className="tblhead">
            <tr>
              <th>Resource Name</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="tblbody">{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
