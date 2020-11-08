import React, { Component } from "react";
import "./NumberList";

class NumberList extends Component {

  render() {
    let listItems = this.props.calcList;

    // const calculationList = props.calcList;
    // console.log({ calculationList }); 
    // const listItems = calculationList.map((number) =>
    //   <li>{number}</li>
    // );

    return <li>{listItems}</li>;
  }
}

export default NumberList;
