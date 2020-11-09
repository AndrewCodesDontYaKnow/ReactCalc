import React, { Component } from "react";
import "./NumberList";

class NumberList extends Component {

  render() {
    let calcArray = this.props.calculationArray;
    // console.log(calcArray)
    const calcItems = calcArray.slice(0).reverse().slice(0,10).map((calculation) => {
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


