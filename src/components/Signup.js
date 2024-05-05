import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (!json.errors) {
        localStorage.setItem("token", json.token);
        navigate("/");
        setCredentials({ name: "", email: "", password: "" });
        setConfirmPassword("");
      } else {
        const errorMessage = json.errors.map((error) => error.msg).join(" ");
        setError(errorMessage);
      }
    } catch (error) {
      setError("Internal Server Error");
      console.error("Signup Failed:", error);
    }
  };  

  const onCloseAlert = () => {
    setError(null);
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "confirmPasswordSignup") {
      setConfirmPassword(e.target.value);
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      {error && <Alert message={error} onClose={onCloseAlert} />}
      <section className="vh-100 mt-5">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="note-taking"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Enter your name"
                    required
                    minLength={3}
                    value={credentials.name}
                    autoComplete="false"
                    onChange={onChange}
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="emailSignup"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter email address"
                    required
                    value={credentials.email}
                    autoComplete="false"
                    onChange={onChange}
                  />
                </div>

                <div data-mdb-input-init className="d-flex form-outline mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="passwordSignup"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={credentials.password}
                    minLength={5}
                    autoComplete="false"
                    onChange={onChange}
                  />
                  <button
                    type="button"
                    className="btn border-0"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <>
                        <i className="fa-solid fa-eye"></i>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-eye-slash"></i>
                      </>
                    )}
                  </button>
                </div>

                <div data-mdb-input-init className="d-flex form-outline mb-3">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPasswordSignup"
                    name="confirmPasswordSignup"
                    className="form-control form-control-lg"
                    placeholder="Confirm password"
                    minLength={5}
                    value={confirmPassword}
                    autoComplete="false"
                    onChange={onChange}
                  />
                  <button
                    type="button"
                    className="btn border-0"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <>
                        <i className="fa-solid fa-eye"></i>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-eye-slash"></i>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Signup
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/login" className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
