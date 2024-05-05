import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-5 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h2 className="mb-4 display-6">Welcome to NoteSyncer</h2>
            <p className="lead">
              NoteSyncer is your ultimate destination for hassle-free note taking. Our platform allows you to create, read, update, and delete notes securely and conveniently.
            </p>
            <p>
              Whether you're a student, professional, or just someone who loves to jot down thoughts, NoteSyncer has got you covered. Say goodbye to scattered notes and hello to organized productivity!
            </p>
            <Link to="/" className="btn btn-primary mt-3">Get Started</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;