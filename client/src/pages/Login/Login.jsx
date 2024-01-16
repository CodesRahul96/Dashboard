import "./login.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/Logo.svg";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {API} = useAuth();
  console.log(API);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();
  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validDomains = [".com", ".in", ".org"]; // Add more valid domains as needed

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      const domain = email.substring(email.lastIndexOf("."));
      if (!validDomains.includes(domain)) {
        setEmailError("Valid email domains are .com, .in");
      } else {
        setEmailError("");
      }
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  // Handle Submit Data
  const handleSubmit = async (e) => {
    const URL = `${API}/auth/login`;
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // console.log("login form", response);
      const res_data = await response.json();
      // console.log("response from login server", res_data.token);

      if (response.ok) {
        // alert("Login Successful");
        alert("Login Successful");
        storeTokenInLS(res_data.token);
        setUser({
          email: "",
          password: "",
        });
        navigate("/projects");
        location.reload();
      } else {
        alert(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        // console.log("Invalid Credentials");
      }
    } catch (error) {
      // console.log("login", error);
    }
  };

  return (
    <div className="loginSection">
      <div className="logo text-center mb-4 ">
        <img className="mb-4" src={Logo} alt="logo" />
        <br />
        <span className="text-white">Online Project Management</span>
      </div>
      <div className="loginContainer">
        <h5 className="text-center mt-3 mb-4 text-secondary">
          Login to get started
        </h5>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleInput}
            onBlur={validateEmail}
          />
          {emailError && <p className="text-danger">{emailError}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleInput}
              onBlur={validatePassword}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-outline-secondary"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {passwordError && <p className="text-danger">{passwordError}</p>}

          <div className="forgetPass mb-3 text-primary">Forget Password?</div>
          <br />
        </div>
        <div className="text-center">
          <button onClick={handleSubmit} className="btn btn-primary ">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
