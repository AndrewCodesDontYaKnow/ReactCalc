import React, { Component } from "react";
import "./NumberList";

class NumberList extends Component {

  render() {
    let calcArray = this.props.calculationArray;

    const generateKey = (pre) => {
      return `${ pre }_${ new Date().getTime() }`;
  }
    // console.log(calcArray)
    const calcItems = calcArray.slice(0).reverse().slice(0,10).map((calculation) => {
      // console.log(calculation)
    const calculationWithPlus = calculation.replace("   ", " + ")
    //   console.log(calculationWithPlus)
      return <li key={ generateKey(data) } >{calculationWithPlus}</li>
    }
    );

    return <ul key={ generateKey(data) }>{calcItems}</ul>;
  }
}

export default NumberList;


