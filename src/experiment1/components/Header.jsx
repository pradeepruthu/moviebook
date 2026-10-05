import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../experiment4/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="header">
      <h1 className="logo">CineBook</h1>

      <nav className="navbar">
        <NavLink to="/" className="nav-box">
          Home
        </NavLink>

        <NavLink to="/movies" className="nav-box">
          Movies
        </NavLink>

        <NavLink to="/booking/summary" className="nav-box">
          Booking Summary
        </NavLink>

        <NavLink to="/booking/payment" className="nav-box">
          Payment
        </NavLink>

        <NavLink to="/booked" className="nav-box">
          Booked Tickets
        </NavLink>

        {user ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className="nav-box">
              Login
            </NavLink>

            <NavLink to="/signup" className="nav-box">
              Signup
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
