import React, { Component } from "react";
import "./NumberList";

class NumberList extends Component {

  render() {
    let calcArray = this.props.calculationArray;
    console.log(calcArray)
    const calcItems = calcArray.slice(0).reverse().map((calculation) =>
      <li>{calculation}</li>
    );

    return <ul>{calcItems}</ul>;
  }
}

export default NumberList;
