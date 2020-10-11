import React, { Component } from "react";
import "./CalculationList.css";

class CalculationList extends Component {

  render() {
    return (
      <div className="calculation-list">
          <ol>
              <li>{this.props.children}</li>
              <li>first calc</li>
              <li>first calc</li>
              <li>first calc</li>
              <li>first calc</li>
              <li>first calc</li>
              <li>first calc</li>
              <li>first calc</li>
              <li>first calc</li>
              <li>first calc</li>
          </ol>
          {/* inherit values from app.js */}
          
      </div>
    );
  }}

export default CalculationList;
