import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import HeroBanner from "../components/HeroBanner";

const ErrorPage = () => {
  return (
    <Hero>
      <HeroBanner title="404" subtitle="page not found">
        <Link to="/" className="btn-primary">
          home
        </Link>
      </HeroBanner>
    </Hero>
  );
};

export default ErrorPage;
