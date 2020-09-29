import React from "react";
import { Menu } from 'antd';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item>
                <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/diet">Diet</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/about">About</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/login">Login</NavLink>
            </Menu.Item>
            <Menu.Item>
                Logout
            </Menu.Item>
        </Menu>
    )

}

export default Navbar