import { Link } from 'react-router-dom';
import { useState, useImperativeHandle, forwardRef } from 'react';
import * as userService from '../../utilities/users-service';
import './NavBar.css';


const NavBar = forwardRef(({ user, setUser, handleChange }, ref) => {
  const [inputVal, setInputVal] = useState('');

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    handleChange(val);
  }

  useImperativeHandle(ref, () => ({
    emptySearch() {
      setInputVal('');
    },
  }));

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link home">
        Home
      </Link>
      <Link to="/discuss" className="navbar-link discussion">
        Discussion
      </Link>
      <div className="search">
        <input
          type="text"
          className="navbar-search-input"
          placeholder="Search"
          value={inputVal}
          onChange={handleInputChange}
        />
      </div>
      <div className="navbar-user">
        <span className="welcome">Welcome, {user.name}</span>
        <Link to="" onClick={handleLogOut} className="navbar-link navbar-link-logout">
          Log Out
        </Link>
      </div>
    </nav>
  );
});

export default NavBar;