import React from "react";

import "../App.css";
import "../all.min.css";
import "../dataTables.bootstrap4.css";
import "../sb-admin.css";
import DashboardHeader from "./DashboardHeader";
import DashboardLeftRail from "./DashboardLeftRail";
import DashboardFooter from "./DashboardFooter";
import { dictionaryAPI } from "../properties";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ data: e.target.value });
  }

  handleSubmit(e) {
    const word = this.state.data;
    const api_key = process.env.REACT_APP_DICT_API_KEY;
    let url = `${dictionaryAPI}${word}?key=${api_key}`;

    fetch(url).then(resp => {
      console.log("REsp::", resp);
      resp.json().then(json => {
        console.log("JSON::::", json);
        this.setState({
          items: json
        });
      });
    });
    e.preventDefault();
  }

  render() {
    var { items, data } = this.state;
    console.log("items::", items);

    return (
      <div className="App">
        <DashboardHeader />
        <div id="wrapper">
          <DashboardLeftRail />
          <div id="content-wrapper">
            <div className="container-fluid">
              <div className="card mb-3">
                <div className="card-header">Dictionary</div>
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <label style={{ padding: "10px" }}>
                      <span style={{ margin: "5px" }}>Enter Word here:</span>
                      <input
                        type="text"
                        value={data}
                        onChange={this.handleChange}
                      />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                  <div>
                    {items.length <= 0 ? null : (
                      <div className="table-responsive">
                        <table
                          className="table table-bordered"
                          id="dataTable"
                          width="100%"
                        >
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Type</th>
                              <th>Meaning</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((i, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index}</td>
                                  {i.fl ? (
                                    <td>
                                      <a>{i.fl}</a>
                                    </td>
                                  ) : null}
                                  <td>{i.shortdef ? i.shortdef : i}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DashboardFooter />
          </div>
        </div>
      </div>
    );
  }
}
