import React, { useState, useEffect } from "react";
import './header.css';
import {Link, withRouter} from "react-router-dom";
import logo from '../../img/logo.png';

const Header = (props) => {
    const [text, setText] = useState("Home")
    const {location} = props;
    
    useEffect(() => {
        switch (location.pathname) {
            case "/main/home":
                setText("Головна")
                break;
            case "/main/post":
                setText("Перегляд блогу")
                break;
            case "/main/create":
                setText("Створення запису")
                break;
            case "/main/blog":
                setText("Бібліотека")
                break;
            case "/main/myblog":
                setText("Мої записи")
                break;
            default: 
                setText("Videoblog")
                break;
        }
    }, [location.pathname])


    if (location.pathname.match("/login") || location.pathname.match("/signup")) {
        return null;
    }
    return(
        <nav className="header">
            <span className="header-title">{text}</span>
        </nav>
    );
}

export default withRouter(Header)