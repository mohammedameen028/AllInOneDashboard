import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardLeftRail from "./DashboardLeftRail";

export default class WeatherConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      latitude:"",
      longitude:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log("e::::", e.target.name);
    console.log("e.value::::", e.target.value);

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    console.log("inside submit::", e);
   const {latitude, longitude} = this.state

    fetch(`/WeatherConditions?latitude=${latitude}&longitude=${longitude}`).then(resp => {
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

    const {items} = this.state
   {items && items.currently && console.log("items.currently.summary:::",items.currently.summary)}
    
    return (
      <div className="App">
        <DashboardHeader />
        <div id="wrapper">
          <DashboardLeftRail />
          <div id="content-wrapper">
            <div className="container-fluid">
              <div className="card mb-3">
                <div className="card-header">Weather Conditions</div>
                <form
                  onSubmit={e => {
                    this.handleSubmit(e);
                  }}
                >
                <div>
                <label>Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                  />
                    </div>
                    <div>
                  <label>Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                  />
                  </div>
                  <input type="submit" value="Submit" />
                </form>
            
                <div className="table-responsive">
                        <table
                          className="table table-bordered"
                          id="dataTable"
                          width="100%"
                        >
                            <thead>
                                <tr>
                                    <th>
                                        Place
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {items.timezone}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                               Currently: <td><b>{items && items.currently && items.currently.summary}</b> </td>
                            </tr>
                            <tr>
                              Temperature:<td><b>{items && items.currently && items.currently.temperature} F | {items && items.currently && (items.currently.temperature - 32) * 5/9} C </b> </td>
                            </tr>
                            <tr>

                            </tr>
                          </tbody>
                    </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
