import React, { useContext } from 'react';
import "./side.css";
import {NavLink, withRouter} from 'react-router-dom';
import { FaTable, FaArrowCircleRight, FaHome, FaStar, FaSignInAlt, FaPlusCircle } from 'react-icons/fa'
import { AuthContext } from '../../context'

const Sidebar = (props) => {
    const {location} = props;
    
    if (location.pathname.match("/login") || location.pathname.match("/signup")) {
        return null;
    }

    const { handleLogout } = useContext(AuthContext);


    return (
        <div className="sidebar">
            <ul className="sidebar-nav">
                <li className="menu">
                    <FaArrowCircleRight size="3rem" className="burger" />
                </li>
                    <li className="side-item">
                        <NavLink to='/main' className="side-link" exact activeClassName="active-link">
                            <FaHome className="item"/>
                            <span className="link-text">Головна</span>
                        </NavLink>
                    </li>
                    <li className="side-item">
                        <NavLink to='/main/myblog' className="side-link" exact activeClassName="active-link">
                            <FaStar size="3rem" className="item"/>
                            <span className="link-text">Моє</span>
                        </NavLink>
                    </li>
                    <li className="side-item">
                        <NavLink to='/main/blog' className="side-link" exact activeClassName="active-link">
                            <FaTable size="3rem" className="item"/>
                            <span className="link-text">Бібліотека</span>
                        </NavLink>
                    </li>
                    <li className="side-item">
                        <NavLink to='/main/create' className="side-link" exact activeClassName="active-link">
                            <FaPlusCircle size="3rem" className="item"/>
                            <span className="link-text">Додати</span>
                        </NavLink>
                    </li>
                    <li className="side-item">
                        <NavLink to="/login" className="side-link" onClick={() => handleLogout()}>
                            <FaSignInAlt size="3rem" className="item"/>
                            <span className="link-text">Вихід</span>
                        </NavLink>
                    </li> 

            </ul>  
        </div>
    )}

export default withRouter(Sidebar);
