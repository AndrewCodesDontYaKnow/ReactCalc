import React, { Component } from "react";
import "./Input.css";

class Input extends Component {

  render() {
    return (
      <div className="input">
          {/* inherit values from app.js */}
          {this.props.children}
      </div>
    );
  }}


export default Input;
