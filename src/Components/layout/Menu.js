import React from "react";
import { useGlobal } from "reactn";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import api from "../../api";
import "./Menu.css";

const MainMenu = props => {
  const [user] = useGlobal("user");
  const [trips, setTrips] = useGlobal("trips")
  const _handleLogout = () => {
    api
      .delete("logout")
      .then(res => res)
      .catch(err => err);
    localStorage.removeItem("state");
    props.history.push("/");
    setTrips([]);

  };
  return (
    <Menu>
      <Menu.Item header>
        <Link to="/dashboard">
          <img className="logo" src="/favicon-16x16.png" />
          <span className="logo-text">MyFieldTripp</span>
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name={user.first_name} />
        <Menu.Item name="logout" onClick={_handleLogout} />
      </Menu.Menu>
    </Menu>
  );
};
export default withRouter(MainMenu);
