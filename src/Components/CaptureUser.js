import React, { useState } from 'react'
import {useForm} from 'react-hook-form'


const onSubmit = (state) => (data) => {
   
   console.log("inside the onSUbmit",data, state );
   
}

const onButtonClick = (fname, lname) => {
    let jsonPayload = {
        "firtName":fname,
        "lastName":lname
    }

    console.log("inside the button", jsonPayload)
    
}

export default function User(props){

    const {register, handleSubmit, watch, errors} = useForm()
    const [state, setState] = useState({showForm: true})
    const watchAllFields = watch();

   

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit(state))}>
                <input type="text" name="Email" placeholder="Enter your Email Address" ref={register(
                                                                                            {   maxLength:30, 
                                                                                                required: 'error message',
                                                                                                pattern: {
                                                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                                                    message: "invalid email address"
                                                                                                  }
                                                                                            })
                                                                                }/>
                                                                                {errors.Email && errors.Email.message}<br/>
                <input type="text" name="address" placeholder="House/Flat No" ref={register({required:true})}/><br/>
                <input type="text" name="address.street" placeholder="Street Name" ref={register}/><br/>
                <input type="text" name="address.city"placeholder="City"  ref={register}/><br/>
                <input type="number" name = "age" placeholder="Age" ref={register} />
                <button type="button" onClick={() => { onButtonClick("ameen","ulla") }}>+</button><br/>
                <button type="submit" > Submit </button>
            </form>
        </div>
        
    )
}