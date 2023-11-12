import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "./../../Assets/Swa-roopwardhinee_logo.png";
import { signUp ,login} from "../../Services/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const [displaylogin, setofflogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    standard :"",
    registrationUsername : "",
    registrationPassword: "",
    isAdmin: false,
  });

  const handleRegister = () => {

    if(registerData.isAdmin)
        dispatch(signUp(registerData.FirstName,registerData.LastName,registerData.email,registerData.registrationPassword,"Admin",navigate))
    else
      dispatch(signUp(registerData.FirstName,registerData.LastName,registerData.email,registerData.registrationPassword,registerData.isAdmin,navigate))
    
    console.log(registerData);
    navigate("/login");
  };

  const fullText = "' स्व ' - रूपवर्धिनी";
  const quote = "विकसित व्हावे | अर्पित होऊनी जावे ||";

  const startTyping = (text, setText, content, callback) => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= content.length) {
        setText(content.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        if (callback) {
          callback();
        }
      }
    }, 100);
  };

  useEffect(() => {
    startTyping("text1", setText1, fullText, () => {
      setTimeout(() => {
        startTyping("text2", setText2, quote, () => {
          setTimeout(() => {
            setText1("");
            setText2("");
            startTyping("text1", setText1, fullText, () => {
              setTimeout(() => {
                startTyping("text2", setText2, quote);
              }, 200);
            });
          }, 200);
        });
      }, 200);
    });
  }, []);

  const toggleRegistrationForm = () => {
    setShowRegistration(!showRegistration);
    setofflogin(!displaylogin);
  };

  const handleLogin = (e) => {

    e.preventDefault();
    console.log(username);
    console.log(password)
    // alert(username);
    dispatch(login(username, password, navigate))
    if (username === "example" && password === "password") {
      setIsAuthenticated(true);
      navigate("/home")
    }
  };

  return (
    <div className="login">
      <div className="orange">
        <div className="name">
          <>
            <img src={logo} className="swa-logo" alt="'Swa' - Roopwardhinee" />
            <p className="org-name">{text1}</p>
            <p className="org-quote">{text2}</p>
          </>
        </div>
      </div>
      <div className="white">
        <div className={`overlay  ${showRegistration ? 'login-slide-out' : 'login-slide-in'}`}>
          <div className="heading">
            <h1>स्वामी दयानंद सरस्वती शाखा </h1>
          </div>
          {displaylogin && (

            <div className="login-cred">
              <h1>Login</h1>

              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button className="login-submit" onClick={handleLogin}>
                Submit
              </button>
            </div>
          )}
          <div className="register">
            {showRegistration ? (
              <div className="registration-form">
                <h2>Create an Account</h2>

                <div className="form-grid">
                  <div className="form-column">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={registerData.FirstName}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, FirstName: e.target.value })
                      }
                      required
                    />

                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, email: e.target.value })
                      }
                      required
                    />
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="username"
                      value={registerData.registrationUsername}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, registrationUsername: e.target.value })
                      }
                      required
                    />

                    <label className="checkbox-label">
                      Request for Admin Role
                      <input
                        type="checkbox"
                        name="role"
                        checked={registerData.isAdmin}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            isAdmin: e.target.checked,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  <div className="form-column">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={registerData.LastName}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          LastName: e.target.value,
                        })
                      }
                      required
                    />
                    <label>Standard</label>
                    <input
                      type="number"
                      placeholder="Standard"
                      value={registerData.standard}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, standard: e.target.value })
                      }
                      required
                    />

                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={registerData.registrationPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          registrationPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                </div>
                <button className="register-submit" onClick={handleRegister}>
                  Register
                </button>
                <button className="register-button" onClick={toggleRegistrationForm}>
                  Already Have an Account
                </button>
              </div>

            ) : (
              <button className="register-button" onClick={toggleRegistrationForm}>
                Don't Have Account ?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
