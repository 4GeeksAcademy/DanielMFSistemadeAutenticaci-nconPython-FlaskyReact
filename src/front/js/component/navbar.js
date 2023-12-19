import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    actions.logout();
    setIsLogin(false);
  };

  useLayoutEffect(() => {
    // Update isLogin based on store.token
    setIsLogin(store.token && store.token !== "" && store.token !== undefined);
  }, [store.token]);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (

            <Link to="/login">
              <button className="btn btn-primary">Log in</button>
            </Link>


          ) : (<Link to="/">
            <button onClick={handleLogout} className="btn btn-primary">
              Log out
            </button>
          </Link>
          )}
        </div>
      </div>
    </nav>
  );
};