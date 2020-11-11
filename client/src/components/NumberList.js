import React, { Component } from "react";
import "./NumberList";

class NumberList extends Component {

  render() {
    let calcArray = this.props.calculationArray;

    const calcItems = calcArray.map((calculation) => {
      const calculationWithPlus = calculation.replace("   ", " + ");
      return <li>{calculationWithPlus}</li>;
    });
    return <ul>{calcItems}</ul>;
  }
}

export default NumberList;
