import React from "react";
import PropTypes from "prop-types";
import Navigation from "../Navigation";
import s from "./AppBar.module.css";

const AppBar = () => {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
};

export default AppBar;
