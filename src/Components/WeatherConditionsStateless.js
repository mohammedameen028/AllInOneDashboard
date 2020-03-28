import React, {useEffect, useState} from 'react'
import DashboardHeader from "./DashboardHeader";
import DashboardLeftRail from "./DashboardLeftRail";

const handleChange = (e,setState) => {
  console.log("e::::",e.target.name);
  console.log("e.value::::",e.target.value);
  
     setState({ [e.target.name]: e.target.value });


     
   }


   const handleSubmit =  (e,setState) => {
    e.preventDefault()
   console.log("inside submit::", e);
   useEffect( async () => {

      await fetch(`/WeatherConditions`)
         .then(resp => { resp.json()
           .then(
             (json) => {
             console.log("JSON::::", json);
            setState({
               data:json
            })
           });
         });
   },[])
   
}

export const WeatherConditions = () => {

    const [state, setState] = useState({lat:"0", long:"0", data:{}})

    console.log("dta:::",state.data);
    
    
    return (
      <div className="App">
        <DashboardHeader />
        <div id="wrapper">
          <DashboardLeftRail />
          <div id="content-wrapper">
            <div className="container-fluid">
              <div className="card mb-3">
                <div className="card-header">Weather Conditions</div>
                <form onSubmit={(e) => {handleSubmit(e, setState)}}>
                <input
                        type="text"
                        
                        name="lat"
                        onChange={(e) => {handleChange(e, setState)}}
                      />
                 <input
                        type="text"
                        
                        name="long"
                        onChange={(e) => {handleChange(e, setState)}}
                      />
                <input type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
