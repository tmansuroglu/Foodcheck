import React from 'react';
import { Menu } from 'antd';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignOut } from '../../redux/actions/AuthActions';
import './index.css';

const Navbar = ({ userId, SignOut }) => {
  return (
    <Menu mode='horizontal' className='navbar'>
      <Menu.Item>
        <NavLink to='/'>Home</NavLink>
      </Menu.Item>
      {userId ? (
        <>
          <Menu.Item>
            <NavLink to='/diet'>Diet</NavLink>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              SignOut();
              return <Redirect to='/' />;
            }}
          >
            Log Out
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item>
            <NavLink to='/login'>Login</NavLink>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.firebase.auth.uid,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    SignOut: () => dispatch(SignOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
