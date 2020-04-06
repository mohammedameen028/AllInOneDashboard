import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardLeftRail from "./DashboardLeftRail";

export default class Covid19Status extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data:{}
      };
    }

    
    componentDidMount() {
        fetch(`https://www.covidvisualizer.com/api`).then(resp => {
            resp.json().then(json => {
              console.log("JSON::::", json);
              this.setState({
                data: json
              });
            });
          });    
    }


      dataRndering = (item) =>{
          console.log("item::",item);
       item.map((i) => {
                return(
                <tr>
                <td>Country:{i.name}</td>
                <td>Active:{i.reports.toLocaleString()}</td>
                <td>Cases:{i.cases.toLocaleString()}</td>
                <td>Deaths:{i.deaths.toLocaleString()}</td>
                <td>Recovered:{i.recovered.toLocaleString()}</td>
                </tr>
                )
                })
        
      }
  
    render() {
        const {data} = this.state
        console.log("data:::",data.countries);
        const data1 = data.countries || {}
        const updatedTime = data.timestamp 
        const worldWideData  = data.worldwide || {}
        const countData = Object.entries(data1)
        console.log("countrDAta:::",countData);
       const newData= countData.map((item, key) => {
            return item[1]
        })


        const {reports, deaths,recovered} = worldWideData
       // console.log("reports,",reports);
     
      return (
        <div className="App">
          <DashboardHeader />
          <div id="wrapper">
            <DashboardLeftRail />
            <div id="content-wrapper">
              <div className="container-fluid">
                <div className="card mb-3">
                  <div className="card-header">Covid 19 Status</div>
                  <div className="table-responsive">
                    <div className="table-responsive">
                        <div>Last Update:{updatedTime}</div>
                        <div className="upperTable">
                        <div className="container-fluid">
                        <div className="card mb-3">
                        <div className="card-header">World Wide Report</div>
                        <table
                          className="table table-bordered"
                          id="dataTable"
                          width="50%"
                        >
                            <tbody>
                                <tr>
                                    <th>
                                        Reported Cases
                                    </th>
                                    <td className="mainNumbersReports">
                                        {reports && reports.toLocaleString()}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Total Deaths
                                    </th>
                                    <td className="mainNumbersDeaths">
                                        {deaths && deaths.toLocaleString()}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Total Recovered
                                    </th>
                                    <td className="mainNumbersRecovered">
                                        {recovered && recovered.toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        <table
                          className="table table-bordered"
                          id="dataTable"
                          width="100%"
                        >
                            <thead>
                            <tr>
                              <th>Country</th>
                              <th>Total Cases</th>
                              <th>Active</th>
                              <th>Deaths</th>
                              <th>Recovered</th>
                              
                            </tr>
                            </thead>
                            <tbody>
                                    {newData.map((i) => {
                                        return (
                                          <tr>
                                            <td>
                                                {i.name}<span className="flag"><img src={i.flag} width="25px" height="20px"/></span>
                                                <div><span className="smallerText">Today: +{i.deltaCases} cases, +{i.deltaDeaths} deaths</span></div>
                                            </td>
                                            <td>{i.cases && i.cases.toLocaleString()}</td>
                                            <td>{i.reports && i.reports.toLocaleString()}</td>
                                            <td>{i.deaths && i.deaths.toLocaleString()}</td>
                                            <td>{i.recovered && i.recovered.toLocaleString()}</td>
                                          </tr>
                                        );
                                    }) }
                            </tbody>
                            </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
