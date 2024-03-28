import React from 'react'
// import './Css/LoggingSignup.css'

const LoggingSignup = () => {
  return (
    <div className='loggingsignup'>
      <div className="loggingsignup-container">
        <h1>Sign Up</h1>
        <div className="loggingsignup-fields">
          <input type="text" placeholder='Your Name' />
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
      <button>Continue</button>
      <p className="loggingsignup-logging">Already have an account? <span>Logging here</span></p>
      <div className="logginsignup-agree">
        <input type="checkbox" name=''id='' />
        <p>I agree to the term of use & privacy police</p>
      </div>
      </div>
      
    </div>
  )
}

export default LoggingSignup
