import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { logoutUser } from "../../Services/auth";
import { useDispatch } from "react-redux";
import { getUser } from "../../Services/auth";
import Loading from "../SmallLoader/Loader";
import SDSS from "./../../Assets/SDSS.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setdata] = useState();
  const dispatch = useDispatch();

  const handle = () => {
    navigate("/u0/updateprofile");
    setIsMenuOpen(false);
  };

  const headerHandle = () => {
    navigate("/home");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const portal = (e) => {;

  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser(navigate));
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result1 = await dispatch(getUser());
      setdata(result1);
    } catch (e) {
      console.log("ERROR AT FRONTEND:", e);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  if (!data || data.length === 0) {
    return <Loading />;
  }

  const renderDropdownItems = () => {
    return (
      <div className="dropdown">
        <p>
          <i class="bx bx-user-circle"></i>
          <strong>{data.firstName +" "+ data.lastName}</strong>
        </p>
        <p>
          <i class="bx bx-user"></i>Role: <strong>{data.role}</strong>
        </p>
          <p className="drop red+" onClick={portal}>
          <i class='bx bxs-notepad'></i>Portal
        </p>
        <p className="drop" onClick={handle}>
          <i class="bx bxs-user-detail"></i>Update Profile
        </p>
        <hr />
        <p className="drop red+" onClick={logout}>
          <i class="bx bx-log-out"></i>Logout
        </p>
      </div>
    );
  };

  return (
    <header className={`header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="ngo-name">
        <div className="menu-toggle" onClick={toggleMenu}>
          <i
            className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`}
            id="menu-icon"
          ></i>
        </div>
        <img src={SDSS} alt="" id="main" />
        <p className="logo" onClick={headerHandle}>
          स्वामी <span>दयानंद</span> सरस्वती शाखा
        </p>
      </div>

      <nav className={`navbar ${isMenuOpen ? "menu-open" : ""}`}>
        <a href="/" className="active" onClick={headerHandle}>
          <i class="bx bxs-home"></i>मुख्य पान
        </a>
        <a href="#about" onClick={handle}>
          <i class="bx bx-history"></i>इतिहास
        </a>
        <a href="#contact" onClick={handle}>
          <i class="bx bxs-phone-call"></i>संपर्क
        </a>

        <div className="profile-container">
          <div className="profile-section" onClick={toggleDropdown}>
            {data.profilePicture == null ? (
              <img
                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              <img
                src={data.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            )}

            <h4>
              <i class="bx bxs-chevron-down"></i>
            </h4>
          </div>
          {isDropdownOpen && window.innerWidth <= 768 && renderDropdownItems()}
        </div>
        {isDropdownOpen && window.innerWidth > 768 && renderDropdownItems()}
      </nav>
    </header>
  );
};

export default Header;
