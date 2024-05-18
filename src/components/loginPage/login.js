import React, { Component } from 'react'
import './login.scss'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default class Login extends Component {

  state = {
    UserID: '',
    Password: ''
  }


  handleOnchangeUserID = (event) => {
    this.setState({
      UserID: event.target.value
    })
  }

  handleOnchangePassWord = (event) => {
    this.setState({
      Password: event.target.value
    })
  }

  render() {
    return (
      <>
        <div className='container'>
          <div className='column'>
            <h2>Log In</h2>

            <form>
              <div className='login_info'>
                <div className='login_detail'>
                  <FaUser />
                  <input type='text' value={this.state.UserID} placeholder='Email or Phone Number'
                    onChange={(event) => { this.handleOnchangeUserID(event) }} required />
                </div>

                <div className='login_detail'>
                  <FaLock />
                  <input type='password' value={this.state.Password} placeholder='PassWord'
                    onChange={(event) => { this.handleOnchangePassWord(event) }} required />
                </div>

              </div>
              <div className='other'>
                <div>
                  <a href='#'>Register an account</a>
                </div>
                <div className='other'>
                  <a href='#'>Forget Password?</a>
                </div>
              </div>

              <input type='submit' value='Log In' />


            </form>
          </div>

        </div>
      </>
    )
  }
}
