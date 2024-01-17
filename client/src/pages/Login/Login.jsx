import "./login.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/Logo.svg";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { API, storeTokenInLS } = useAuth();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    if (!emailRegex.test(user.email)) {
      setEmailError("Please enter a valid credentials");
    } else {
      const domain = user.email.substring(user.email.lastIndexOf("."));
      if (!validDomains.includes(domain)) {
        setEmailError("Invalid credentials!");
      } else {
        setEmailError("");
      }
    }
  };

  const validatePassword = () => {
    if (user.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (emailError || passwordError) {
      toast.error("Enter valid credentials");
      return;
    }

    const URL = `${API}/auth/login`;

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
        navigate("/projects");
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
      <div className="loginTop">
      <div className="loginLogo mb-4 ">
        <img className="mb-4" src={Logo} alt="logo" />
        <br />
        <span className="text">Online Project Management</span>
      </div>
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
          {/* {emailError && <p className="text-danger">{emailError}</p>} */}
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
