import React from 'react';

import '../App.css';
import '../all.min.css';
import '../dataTables.bootstrap4.css';
import '../sb-admin.css';

import DashboardHeader from './DashboardHeader';
import DashboardLeftRail from './DashboardLeftRail';
import DashboardFooter from './DashboardFooter';
import data from '../Response_data.json';



export default class Dashboard extends React.Component {

  constructor(props){
    super(props);

    this.state = {
          items : []
    }
    
    
    
  }
    
  componentDidMount() {
    
      console.log("Data is here :::",data);
      console.log("inside the matches::",data.matches);

      this.setState({
        items: data.matches
      })
      
    
      if(this.isEmpty(data))
      {
        console.log("data is object!!!");
        
      }else{

        console.log("data is not the object");
        
      }
      
    
    } 
    
    isEmpty(obj)
    {
      for(var key in obj){
        if(obj.hasOwnProperty(key))
          return false;
        
      }
      return true;
    }

    _renderObject(items){
      return Object.entries(items).map(([key, value], i) => {
        return (
              <tbody>
                <td>{value.team1.name} vs {value.team2.name}</td>
                <td>{value.series.name}</td>
                <td>{value.match_desc}</td>
                <td>{value.venue.location}</td>
                <td>{value.state_title}</td>
                <td>{value.score && value.score.batting && value.score.batting.score}</td>
              </tbody>
        )
      })
    }
    render() {

      var {items} = this.state
      return(
        <div className="App">
          <DashboardHeader/>
          <div id="wrapper">
            <DashboardLeftRail triggerSubDomain={this.calledDomain}/>
          <div id="content-wrapper">
            <div className="container-fluid">
              <div className="card mb-3">
                <div className="card-header">
                  Results
                </div>
                <div>
                  <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%">
                      <thead>
                        <th>Match</th>
                        <th>Series</th>
                        <th>Match_desc</th>
                        <th>Venue</th>
                        <th>status</th>
                        <th>status</th>
                      </thead>
                          {this._renderObject(items)}
                    </table>
                  </div>
                  </div>
              </div>
            </div>
            <DashboardFooter/>
            </div>
          </div>
        </div>
      );
      }
    }

  