import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogoutAction } from "../Actions/Loginaction";

const Navbar = ({ history }) => {
  const userlogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { userinfo } = userlogin;

  const logoutUser = () => {
    dispatch(userLogoutAction());
  };

  return (
    <>
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mt-2 mt-lg-0 mr-2">
              {userinfo ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/signin"
                    onClick={logoutUser}
                  >
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/">
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin">
                      Sign In
                    </NavLink>
                  </li>
                </>
              )}
              
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
