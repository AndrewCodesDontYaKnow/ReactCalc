import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  // returns true if val is a number, a period, or equals sign
  isOperator = (val) => {
    return !isNaN(val) || val === "." || val === "=";
  };


  render() {
    return (
      <div
        // if the button's val is a number, dont add a class, if it's an operator, add the class 'operator'
        className={`button ${
          this.isOperator(this.props.children) ? "" : "operator"}`}
          onClick={() => {
              this.props.handleClick(this.props.children);
              console.log(`hi`)
            
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
