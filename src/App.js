import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import ClearButton from "./components/ClearButton";
import CalculationList from "./components/CalculationList";

function NumberList(props) {
  console.log(props)
  const calculationList = props.calcList;
  console.log(props.calcList)
  const listItems = calculationList.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
const calcList = [];

class App extends Component {
  // container for holding the states
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      previousNumber: "",
      currentNumber: "",
      operator: "",
      calcRecord: "",
      answer: "",
    };

  }



  addToInput = (val) => {
    this.setState({ input: this.state.input + val });
    this.setState({ calcRecord: this.state.calcRecord + val })
  };

  addZeroToInput = (val) => {
    // if this.state.input is not empty then add zero
    if (this.state.input !== "") {
      this.setState({ input: this.state.input + val });
      this.setState({ calcRecord: this.state.calcRecord + val })
    }
  };

  addDecimal = (val) => {
    // if there is no decimal in input, then add the decimal
    if (this.state.input.indexOf(".") === -1) {
      this.setState({ input: this.state.input + val });
      this.setState({ calcRecord: this.state.calcRecord + val })
    }
  };

  clearInput = () => {
    this.setState({ 
      input: "",
      calcRecord: ""
    });
  };

  add = () => {
    // store the previous number so we can use it in the operator function
    // this.state.previousNumber = this.state.input;
    // this.setState({ previousNumber: this.state.input })
    // this.setState({ input: "" });
    // this.state.operator = "plus";
    // this.setState({ calcRecord: this.state.calcRecord + " + " })

    this.setState({
      previousNumber: this.state.input,
      input: "",
      operator: "plus",
      calcRecord: this.state.calcRecord + "+"
    })

  };


handleEvaluate = () => {
  let calcArray = [];
  this.setAnswer(this.evaluate());
  this.setState({
    input: this.evaluate()
  }) 

// calcList.unshift(this.evaluate())
// console.log(calcList)

  // calcArray.push(this.evaluate())
  // console.log(calcArray)
  
}

  evaluate = () => {
    this.state.currentNumber = this.state.input;

    let answer = 0;

    if (this.state.operator === "plus") {
      
        answer = 
          parseFloat(this.state.previousNumber) +
          parseFloat(this.state.currentNumber)
      
    } else if (this.state.operator === "subtract") {
      answer = 
          parseFloat(this.state.previousNumber) -
          parseFloat(this.state.currentNumber)
      
    } else if (this.state.operator === "multiply") {
      answer = 
          parseFloat(this.state.previousNumber) *
          parseFloat(this.state.currentNumber)
      
    } else if (this.state.operator === "divide") {
      answer = 
          parseFloat(this.state.previousNumber) /
          parseFloat(this.state.currentNumber)
      
    }



    return answer
  };

setAnswer = (answer) => {

  // calcList.unshift(this.evaluate())
let result = this.state.calcRecord + " = " + answer

if (calcList.length < 10){
  this.setState({ 
    calcRecord: result,
    calcList: calcList.unshift(result)
  });
} else if (calcList.length >= 10) {
  this.setState({ calcList: calcList.pop()})
  console.log(`this is the calcList after pop: ${this.state.calcList}`)
  this.setState({ 
    calcRecord: result,
    calcList: calcList.unshift(result)
  });
}
 // return this.setState({ calcRecord: this.state.calcRecord + " = " + answer });

}

  subtract = () => {
    this.state.previousNumber = this.state.input;
    this.setState({ input: "" });
    this.state.operator = "subtract";
    this.setState({ calcRecord: this.state.calcRecord + " - " });
  };

  multiply = () => {
    this.state.previousNumber = this.state.input;
    this.setState({ input: "" });
    this.state.operator = "multiply";
    this.setState({ calcRecord: this.state.calcRecord + " * " });
  };

  divide = () => {
    this.state.previousNumber = this.state.input;
    this.setState({ input: "" });
    this.state.operator = "divide";
    this.setState({ calcRecord: this.state.calcRecord + " / " });
  };

  render() {
    return (
      <div className="App">
        <div className="calc-wrapper">
          <div className="row">
            <Input>{this.state.input}</Input>
          </div>

          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.divide}>/</Button>
          </div>

          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.multiply}>*</Button>
          </div>

          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.add}>+</Button>
          </div>

          <div className="row">
            <Button handleClick={this.addDecimal}>.</Button>
            <Button handleClick={this.addZeroToInput}>0</Button>
            <Button handleClick={this.handleEvaluate}>=</Button>
            <Button handleClick={this.subtract}>-</Button>
          </div>

          <div className="row">
            <ClearButton handleClear={this.clearInput}>Clear</ClearButton>
          </div>
        </div>
        <div className="list-wrapper">

        <NumberList calcList={calcList} />

      {/* <CalculationList>{this.state.calcRecord}</CalculationList> */}
        </div>
      </div>
    );
  }
}

export default App;
