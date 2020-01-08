import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import HeroBanner from "../components/HeroBanner";
import RoomsContainer from "../components/RoomsContainer";

const Rooms = () => {
  return (
    <Fragment>
      <Hero hero="roomsHero">
        <HeroBanner title="our rooms" subtitle="">
          <Link to="/" className="btn-primary">
            home
          </Link>
        </HeroBanner>
      </Hero>
      <RoomsContainer />
    </Fragment>
  );
};

export default Rooms;
