import React from "react";
import RegistrationModal from "../RegistrationModal";
import { Link } from "react-router-dom";
import "./landingPage.css";

import {
  Menu,
} from "semantic-ui-react";
import LoginModal from "../LoginModal";

function AppHeader() {
  return (
    <>
      <div>
        <Menu borderless fixed="top">
          <Menu.Item header>
            <Link to="/">
              <img alt="bus favicon" className="logo" src="/favicon-16x16.png"/>
              <span className="logo-text">MyFieldTripp</span>
            </Link>
          </Menu.Item>
          <Menu.Menu className="siblingFade" position="right">
            <Menu.Item as="span" className="menuItem" name="How it works">
              <span><a className="anchor-tag" href="#sign-up-gif">How it Works</a></span>
            </Menu.Item>
            <Menu.Item as="span" className="menuItem" name="login">
              <LoginModal />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>

      <div className="hero">
        <div className="overlay"></div>
        <div className="hero-text-wrapper">
          <p className="hero-text">
            TAKE CONTROL OF THE MADNESS BY USING OUR APP TO PLAN AND ORGANIZE
            YOUR NEXT FIELD TRIP
          </p>
          <RegistrationModal />
        </div>
      </div>
    </>
  );
}

export default AppHeader;
