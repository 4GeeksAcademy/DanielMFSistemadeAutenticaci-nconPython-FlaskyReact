import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const SignUp = () => {
  const { actions } = useContext(Context);
  const [itemUser, setitemUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const success = await actions.newUser(itemUser);
      if (success) {
        // Redirect to the login page upon successful signup
        navigate("/login");
      } else {
        // Handle signup failure, e.g., display an error message
        console.log("Signup failed. Please try again.");
        setitemUser({
          ...itemUser,
          password: "", // Clear the password field
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="text-center">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card-body p-md-5 mx-md-4">
              <hr className="my-4" />
              <form>
                <p>Sign up</p>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example11"
                    className="form-control"
                    value={itemUser.email}
                    placeholder="Email"
                    onChange={(event) => {
                      setitemUser({
                        ...itemUser,
                        email: event.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example22"
                    className="form-control"
                    placeholder="Password"
                    value={itemUser.password}
                    onChange={(event) => {
                      setitemUser({
                        ...itemUser,
                        password: event.target.value,
                      });
                    }}
                  />
                </div>

                <div className="text-center pt-1 mb-3 pb-1 d-flex flex-column">
                  <button
                    className="btn btn-travelink rounded-pill mb-3 btn-primary"
                    type="button"
                    onClick={handleSignup}
                  >
                    Sign up
                  </button>
                  <Link to="/login">
                    <button
                      className="btn btn-travelink rounded-pill mb-3 btn-secondary"
                      type="button"
                    >
                      Already have an account? Log in
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};