import React, { useState } from "react";
import axios from "axios";

const Register = ({ history }) => {
  const [signup, setSignup] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "M",
  });

  const RegisterUser = (e) => {
    const name = e.target.name;
    setSignup({ ...signup, [name]: e.target.value });
  };

  const registerUserDetails = async (e) => {
    e.preventDefault();
    if (
      signup.firstname == "" ||
      signup.lastname == "" ||
      signup.email == "" ||
      signup.password == "" ||
      signup.gender == ""
    ) {
      alert("all fields are mandatory");
    } else {
      if (signup.password !== signup.confirm_password) {
        alert("password does not match");
      } else {
        try {
          const { data } = await axios.post("/api/v1/register", signup);
          if (data) {
            alert(data.message);
            setSignup({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirm_password: "",
              gender: "M",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <div className="container sign_up">
        <div className="row h-100 w-100">
          <div className="col-sm-12 w-100 d-flex align-items-center justify-content-center">
            <form
              action="r"
              method="post"
              accept-charset="utf-8"
              className="form"
              role="form"
            >
              <div className="row">
                <div className="col-xs-6 col-md-6 my-3">
                  <input
                    type="text"
                    name="firstname"
                    value={signup.firstname}
                    onChange={RegisterUser}
                    className="form-control input-lg"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col-xs-6 col-md-6 my-3">
                  <input
                    type="text"
                    name="lastname"
                    value={signup.lastname}
                    onChange={RegisterUser}
                    className="form-control input-lg"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="col-xs-6 col-md-6 my-3">
                  <input
                    type="text"
                    name="email"
                    value={signup.email}
                    onChange={RegisterUser}
                    className="form-control input-lg"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="col-xs-6 col-md-6 my-3">
                  <input
                    type="password"
                    name="password"
                    value={signup.password}
                    onChange={RegisterUser}
                    className="form-control input-lg "
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="col-xs-6 col-md-6 my-3">
                  <input
                    type="password"
                    name="confirm_password"
                    value={signup.confirm_password}
                    onChange={RegisterUser}
                    className="form-control input-lg"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className="col-xs-12 col-md-12 my-3">
                  <label>Gender : </label>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      className="mx-2"
                      name="gender"
                      value="M"
                      id="male"
                      onChange={RegisterUser}
                      checked
                    />
                    Male
                  </label>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      className="mx-2"
                      name="gender"
                      value="F"
                      id="female"
                      onChange={RegisterUser}
                    />
                    Female
                  </label>
                </div>
                
                <br />
                <button
                  className="btn btn-dark signup-btn my-2"
                  type="submit"
                  onClick={registerUserDetails}
                >
                  Create my account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
