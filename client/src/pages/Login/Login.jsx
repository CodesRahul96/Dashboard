import "./login.css";
import React, { useState } from "react";
import Logo from "../../assets/Logo.svg";
import BGLOGIN from "../../assets/login-bg-1.svg";
import Hide from "../../assets/hide-password.svg";
import Show from "../../assets/show-password.svg";
import Oval from "../../assets/Oval.svg";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { URI, storeTokenInLS } = useAuth();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  document.title = "Login";

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    if (name === "email") {
      validateEmail();
    } else if (name === "password") {
      validatePassword();
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = [".com", ".in", ".org"];

    if (!user.email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(user.email)) {
      setEmailError("Please enter a valid email address");
    } else {
      const domain = user.email.substring(user.email.lastIndexOf("."));
      if (!validDomains.includes(domain)) {
        setEmailError("Enter valid email");
      } else {
        setEmailError("");
      }
    }
  };

  const validatePassword = () => {
    if (!user.password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (emailError || passwordError) {
      toast.error("Invalid credintial");
      return;
    }

    const URL = `${URI}/auth/login`;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);

        setUser({
          email: "",
          password: "",
        });

        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      toast.error("Error during login:", error);
    }
  };

  return (
    <div className="loginSection">
      {/* Top */}
      <div className="loginTopContainer">
        <div className="ovalContainer">
          <img src={Oval} alt="oval" />
        </div>
        <div className="loginContent1">
          <img className="logo" src={Logo} alt="logo" />
          <span className=".online-project-manag">
            Online Project Management
          </span>
        </div>
      </div>

      {/* Bottom */}
      <div className="loginBottomContainer">
        <div className="loginContent2">
          <img className="logo" src={Logo} alt="logo" />
          <span className=".online-project-manag">
            Online Project Management
          </span>
        </div>
        <div className="formContainer">
          <span className="login-to-get-started">Login to get started</span>
          {/* Email Input */}
          <div className="emailContainer ">
            <label htmlFor="email" className="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="emailInput"
              name="email"
              value={user.email}
              onChange={handleInput}
              onBlur={validateEmail}
            />
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>
          {/* Password Input */}
          <div className="passwordContainer">
            <label htmlFor="password" className="password">
              Password
            </label>
            <div className="rectangle-copy passwordInput">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="passwordInput"
                name="password"
                value={user.password}
                onChange={handleInput}
                onBlur={validatePassword}
              />
              <span
                role="button"
                onClick={() => setShowPassword(!showPassword)}
                className=""
              >
                <img
                  src={showPassword ? `${Show}` : `${Hide}`}
                  className="eye-1"
                  alt={showPassword ? "show-password" : "hide-password"}
                />
              </span>

            </div>
              {passwordError && <p className="text-danger">{passwordError}</p>}
            <span className="forgot-password">Forget Password?</span>
          </div>
          <div className="rectangle">
            <span onClick={handleSubmit} className="login ">
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
