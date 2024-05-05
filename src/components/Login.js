import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (!json.error) {
        localStorage.setItem("token", json.token);
        navigate("/");
      } else {
        setError(json.error);
        setCredentials({ email: "", password: "" });
      }
    } catch (error) {
      setError(error);
    }
  };

  const onCloseAlert = () => {
    setError(null); 
  };

  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email address"
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

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="link-danger">
                      Register
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

export default Login;