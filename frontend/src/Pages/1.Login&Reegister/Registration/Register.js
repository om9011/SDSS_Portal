import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../Services/auth";
import logo from "./../../../Assets/Swa-roopwardhinee_logo.png";

const Register = () => {

    const [showRegistration, setShowRegistration] = useState(false);
    const [displaylogin, setofflogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleRegistrationForm = () => {
        setShowRegistration(!showRegistration);
        setofflogin(!displaylogin);
        navigate("/login")
    };

    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");


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



    const handleRegister = () => {

        if (registerData.isAdmin)
            dispatch(signUp(registerData.FirstName, registerData.LastName, registerData.email, registerData.registrationPassword, "Admin", navigate))
        else
            dispatch(signUp(registerData.FirstName, registerData.LastName, registerData.email, registerData.registrationPassword, registerData.isAdmin, navigate))

        console.log(registerData);
    };
    const [registerData, setRegisterData] = useState({
        FirstName: "",
        LastName: "",
        email: "",
        standard: "",
        conactNumber: "",
        registrationPassword: "",
        isAdmin: false,
    });
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
                    <div className="register">

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
                                    <label>Contact No.</label>
                                    <input
                                        type="number"
                                        placeholder="Contact No"
                                        value={registerData.conactNumber}
                                        onChange={(e) =>
                                            setRegisterData({ ...registerData, conactNumber: e.target.value })
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
                                        min={5}
                                        max={20}
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;