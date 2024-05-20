import React from "react";
import "./Register.scss";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Register() {
  return (
    <>
      <div className="register_container">
        <div className="column_register">
          <h2>Sign up</h2>

          <form>
            <div className="register_info">
              <div className="register_detail">
                <FaUser />
                <input
                  type="text"
                  value=""
                  placeholder="Username"
                  onChange={(event) => {
                    this.handleOnchangeUserID(event);
                  }}
                  required
                />
              </div>

              <div className="register_detail">
                <MdEmail />
                <input
                  type="text"
                  value=""
                  placeholder="Email"
                  onChange={(event) => {
                    this.handleOnchangePassWord(event);
                  }}
                  required
                />
              </div>

              <div className="register_detail">
                <FaLock />
                <input
                  type="password"
                  value=""
                  placeholder="Password"
                  onChange={(event) => {
                    this.handleOnchangePassWord(event);
                  }}
                  required
                />
              </div>
              <div className="register_detail">
                <FaLock />
                <input
                  type="password"
                  value=""
                  placeholder="Confirm password"
                  onChange={(event) => {
                    this.handleOnchangePassWord(event);
                  }}
                  required
                />
              </div>
            </div>
            <div className="other">
              <div>
                <a href="/login">Already have an account?</a>
              </div>
            </div>

            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    </>
  );
}
