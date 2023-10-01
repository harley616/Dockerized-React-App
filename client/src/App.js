import './App.css';
import { Link, Outlet, } from 'react-router-dom'
import React, { Component } from "react";




class App extends Component {
  render() {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </>

    )
  }
}

export default App;












