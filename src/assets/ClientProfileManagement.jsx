import React from 'react'
import '../css/ClientProfileManagement.css'

// 

export default function ClientProfileManagement() {
    const stateOptions = ["Alabama"
        ,"Alaska"
        ,"Arizona"
        ,"Arkansas"
        ,"California"
        ,"Colorado"
        ,"Connecticut"
        ,"Delaware"
        ,"Florida"
        ,"Georgia"
        ,"Hawaii"
        ,"Idaho"
        ,"Illinois" 
        ,"Indiana"
        ,"Iowa"
        ,"Kansas"
        ,"Kentucky"
        ,"Louisiana"
        ,"Maine"
        ,"Maryland"
        ,"Massachusetts"
        ,"Michigan"
        ,"Minnesota"
        ,"Mississippi"
        ,"Missouri"
        ,"Montana"
        ,"Nebraska"
        ,"Nevada"
        ,"New Hampshire"
        ,"New Jersey"
        ,"New Mexico"
        ,"New York"
        ,"North Carolina"
        ,"North Dakota"
        ,"Ohio"
        ,"Oklahoma"
        ,"Oregon"
        ,"Pennsylvania"
        ,"Rhode Island"
        ,"South Carolina"
        ,"South Dakota"
        ,"Tennessee"
        ,"Texas"
        ,"Utah"
        ,"Vermont"
        ,"Virginia"
        ,"Washington"
        ,"West Virginia"
        ,"Wisconsin"
        ,"Wyoming"]

  return (
    <div className='ClientProfileManagement_wrapper'> 
        <h2>Client Profile Management</h2>
        <form className='CPM_Form'>
            <label for="fullName">Full Name:</label> <br />
            <input type="text" id="fullName" name="fullName" maxlength="50" required/> <br />

            <label for="address1">Address 1:</label> <br />
            <input type="text" id="address1" name="address1" maxlength="100" required/> <br />

            <label for="address2">Address 2:</label> <br />
            <input type="text" id="address2" name="address2" maxlength="100" /> <br />

            <label for="city">City:</label> <br />
            <input type="text" id="city" name="city" maxlength="100" required/> <br />

            <label for="state">State:</label> <br />
            <select required>
                {stateOptions.map((value)=> (<option value={value} key={value}>{value}</option>))}
            </select> <br />

            <label for="zipcode">Zipcode:</label> <br />
            <input type="text" id="zipcode" name="zipcode" pattern="[0-9]*" minlength="5" maxlength="9" required/> <br />
            
            <input type="submit" value="Submit" />
        </form>
    </div>
  )
}
