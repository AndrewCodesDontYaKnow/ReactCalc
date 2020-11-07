import React, { Component } from "react";
import "./NumberList";

class NumberList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let listItems = this.props.calcList;

    // const calculationList = props.calcList;
    // console.log({ calculationList }); 
    // const listItems = calculationList.map((number) =>
    //   <li>{number}</li>
    // );

    return <h1>{listItems}</h1>;
  }
}

export default NumberList;
