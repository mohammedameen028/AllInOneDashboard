import React from 'react';
import '../App.css';
import '../all.min.css';
import '../dataTables.bootstrap4.css';
import '../sb-admin.css';
import { NavLink } from 'react-router-dom'


export default class DashboardLeftRail extends React.Component {
    render() {
        return (
        <ul className="sidebar navbar-nav">
                <li className="nav-item active">
                   <div className="nav-link" href="#">
                        <span>Dashboard</span>
                        <ul>
                            <NavLink to="/Covid19">Covid19 Status</NavLink>
                         </ul>
                        <ul>
                            <NavLink to="/Dictionary">Dictionary</NavLink>
                         </ul>
                         {/* <ul>
                            <NavLink to="/WeatherConditions">Weather Conditions</NavLink>
                         </ul> */}
                         {/* <ul>
                            <NavLink to="/User">User</NavLink>
                         </ul> */}
                    </div>
                    
              </li>
            </ul>
        );

        
    }
}