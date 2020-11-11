import React, { Component } from "react";
import "./NumberList";

class NumberList extends Component {

  render() {
    let calcArray = this.props.calculationArray;
    // console.log(calcArray)
    const calcItems = calcArray.reverse().map((calculation) => {
      // console.log(calculation)
    const calculationWithPlus = calculation.replace("   ", " + ")
    //   console.log(calculationWithPlus)
      return <li>{calculationWithPlus}</li>
    }
    );

    return <ul>{calcItems}</ul>;
  }
}

export default NumberList;


