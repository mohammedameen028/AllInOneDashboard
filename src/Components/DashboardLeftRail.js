import React from 'react';
import '../App.css';
import '../all.min.css';
import '../dataTables.bootstrap4.css';
import '../sb-admin.css';


export default class DashboardLeftRail extends React.Component {

    

    
    render() {
        return (
        <ul className="sidebar navbar-nav">
                <li className="nav-item active">
                   <a className="nav-link" href="#">
                        <span>Dashboard</span>
                        <ul>
                            <li>Fun</li>
                         </ul>
                    </a>
              </li>
            </ul>
        );

        
    }
}