import React from 'react';

import '../App.css';
import '../all.min.css';
import '../dataTables.bootstrap4.css';
import '../sb-admin.css';
import DashboardHeader from './DashboardHeader';
import DashboardLeftRail from './DashboardLeftRail';
import DashboardFooter from './DashboardFooter';

export default class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
                  data:'',
                  items:[]
                  } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e){
    this.setState({data: e.target.value})
    
  }

  handleSubmit(e){
    const word = this.state.data
    const api_key = process.env.REACT_APP_DICT_API_KEY
    
    fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${api_key}`)
      .then(resp => {
        console.log("REsp::",resp)
        resp.json().then(json =>{
          console.log("JSON::::",json)
          this.setState({
            items:json
          })
        })
    } )
    e.preventDefault();
  }
    
    render() {
      var {items,data} = this.state

      return(
        <div className="App">
          <DashboardHeader/>
          <div id="wrapper">
            <DashboardLeftRail/>
          <div id="content-wrapper">
            <div className="container-fluid">
              <div className="card mb-3">
                <div className="card-header">
                  Dictionary
                </div>
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      Enter Word here:
                        <input type="text" value={data} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                  <div>
                  <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%">
                              <tbody>
                      {items.map((i,k) => {
                        return(
                         
                              <tr key={k}>
                                {i.fl?<td>
                                  <a>{i.fl}</a>
                                </td>: null}
                                <td>
                                {i.shortdef?i.shortdef: i}
                                </td>
                              </tr>
                           
                        )
                      })}
                      </tbody>
                       </table>
                          </div>
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

  