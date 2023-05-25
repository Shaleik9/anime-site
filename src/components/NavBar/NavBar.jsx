import { Link } from 'react-router-dom';
import { useState, useImperativeHandle, forwardRef } from 'react';
import * as userService from '../../utilities/users-service';

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
    <nav>
      <Link to="/">Home</Link>
      &nbsp; | &nbsp;
      {/* <Link to="/orders/new">New Order</Link>
      &nbsp;&nbsp; */}
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
      <div className="search">
        <input 
          type="text" 
          className="navbarSearch"
          placeholder="Search for anime"
          value={inputVal}
          onChange={handleInputChange}
        />
      </div>
    </nav>
  );
});

export default NavBar;