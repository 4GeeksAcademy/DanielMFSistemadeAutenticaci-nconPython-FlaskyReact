import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token) navigate("/private");
  }, [store.token]);

  const handleLogin = async () => {
    try {
      let success = await actions.login(credentials);
      if (success) {
        // Redirect to the private page upon successful login
        navigate("/private");
      } else {
        // Handle login failure, e.g., display an error message
        console.log("Wrong password or username.");
        setCredentials({
          ...credentials,
          password: "",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
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
                <p>Sign in</p>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example11"
                    className="form-control"
                    value={credentials.email}
                    placeholder="Email"
                    onChange={(event) => {
                      setCredentials({
                        ...credentials,
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
                    value={credentials.password}
                    onChange={(event) => {
                      setCredentials({
                        ...credentials,
                        password: event.target.value,
                      });
                    }}
                  />
                </div>

                <div className="text-center pt-1 mb-3 pb-1 d-flex flex-column">
                  <button
                    className="btn btn-travelink rounded-pill mb-3 btn-primary"
                    type="button"
                    onClick={handleLogin}
                  >
                    Log in
                  </button>
                  <Link to="/signup">
                    <button
                      className="btn btn-travelink rounded-pill mb-3 btn-secondary"
                      type="button"
                    >
                      New User
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