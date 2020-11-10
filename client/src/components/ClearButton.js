import React, { Component } from "react";
import "./ClearButton.css";

class ClearButton extends Component {

  render() {
    return (
      <div className="clear-btn"
      onClick={() => this.props.handleClear()}
      
      >
          {/* inherit values from app.js */}
          {this.props.children}
      </div>
    );
  }}


export default ClearButton;
