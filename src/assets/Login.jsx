import React from 'react'
// import "../assets/Login.css"

export default function Login() {
  return (
  <div className='login_wrapper'>
    <div className='login_form_wrapper'>
      <form className='login_form'>
      <label for="username" > Username:</label><br/>
      <input type="text" id="username" name="username" required/><br/>
      <label for="password"> Password:</label><br/>
      <input type="password" id="password" name="password" required/><br/>
      <div className="submit_buttons">
        <input type="submit" id="login" value="Login"/>
        <input type="submit" id="register" value="Register"/>
      </div>
   </form>
   </div>
   
 </div>
  )
}
