import React from 'react';
import {
  Menu
} from 'semantic-ui-react'

function AppHeader() {
  return (
  <>
    <div>
    <Menu>
        <Menu.Item header>MyFieldTripp</Menu.Item>
        <Menu.Item
          name='aboutUs'
        />
        <Menu.Item name='jobs' />
        <Menu.Item
          name='locations'
        />
      </Menu>
    </div>
  </>
  );
}

export default AppHeader;