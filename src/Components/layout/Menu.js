import React from "react";
import { useGlobal } from "reactn";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import LoginModal from '../LoginModal/index';
import api from "../../api";
import axios from 'axios';

const MainMenu = props => {
  const [user, setUser] = useGlobal("user");
  console.log('props here', props)


  const _handleLogout = () => {
    if (!user.provider === 'google') {
      //local auth logout
      api
        .delete("logout")
        .then(res => res)
        .catch(err => err);
      props.history.push("/");
    } else {

      //google oauth logout
      axios({
        method: 'get',
        url: 'http://localhost:5000/auth/logout',
        withCredentials: true
      })
        .then(res => {
          setUser({})
          console.log('is this true?', {} === true)
          props.history.push("/");
        })
        .catch(err => {
          console.log(err)
        });

    }
  }

  const _handleDashboard = () => {
    props.history.push('/dashboard')
  }


  return (

    <Menu borderless>
      <Menu.Item header>
        <Link to="/">MyFieldTripp</Link>
      </Menu.Item>

      <Menu.Menu className="siblingFade" position="right">

        {(props.history.location.pathname === '/') ?
          <>
            <Menu.Item style={{}} as="span" className="menuItem " name="AboutUs">
              <span>About us</span>
            </Menu.Item>
            <Menu.Item as="span" className="menuItem" name="How it works">
              <span>How it Works</span>
            </Menu.Item>
          </>
          : null}

        {(!(props.history.location.pathname === '/dashboard') && user.displayName) ?
          <>
            <Menu.Item name="Dashboard" onClick={_handleDashboard} />
          </>
          : null}

        {((!user.displayName) && props.history.location.pathname === '/') ?
          <>
            <Menu.Item as="span" className="menuItem" name="login">
              <LoginModal />
            </Menu.Item>
          </>
          :
          <>
            <Menu.Item name={user.displayName} />
            <Menu.Item name="logout" onClick={_handleLogout} />
          </>}

      </Menu.Menu>
    </Menu>
  );
};
export default withRouter(MainMenu);