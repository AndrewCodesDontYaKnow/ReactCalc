import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import ClearButton from "./components/ClearButton";
import NumberList from "./components/NumberList";
// import axios from 'axios';



// function NumberList(props) {
//   // console.log(props)
//   const calculationList = props.calcList;
//   // console.log(props.calcList)
//   const listItems = calculationList.map((number) =>
//     <li>{number}</li>
//   );
//   return (
//     <ul>{listItems}</ul>
//   );
// }
// const calcList = [];

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
      calculations: [],
      calculation: {
        id: 1,
        calc: 'sample calculation'
      },
      test: 'testhi',
      calcList: []
    };

    
  }

componentDidMount() {
  this.getCalculations();
}


getCalculations = _ => {
  fetch('http://localhost:4000/calculations')
    .then(response => response.json())
    .then(response => this.setState({ calculations: response.data }))
    .catch(err => console.error(err))
}

addCalculation = _ => {
  fetch(`http://localhost:4000/calculations/add?calc=${this.state.test}`)
    // .then(response => response.json())
    .then(this.getCalculations)
    .catch(err => console.error(err))
}

// 
renderCalculation = ({ id, calc }) => <div key={id}>{calc}</div>


// comment new comment
  addToInput = (val) => {
    this.setState({ input: this.state.input + val });
    this.setState({ calcRecord: this.state.calcRecord + val })
  };

  addZeroToInput = (val) => {
    // if this.state.input is not empty then add zero
    if (this.state.input !== "") {
      this.setState({ 
        input: this.state.input + val,
        calcRecord: this.state.calcRecord + val
       });
    }
  };

  addDecimal = (val) => {
    // if there is no decimal in input, then add the decimal
    if (this.state.input.indexOf(".") === -1) {
      this.setState({ 
        input: this.state.input + val,
        calcRecord: this.state.calcRecord + val
       });
    }
  };

  clearInput = () => {
    this.setState({ 
      input: "",
      calcRecord: ""
    });
  };

  add = () => {
    this.setState({
      previousNumber: this.state.input,
      input: "",
      operator: "plus",
      calcRecord: this.state.calcRecord + "+"
    })

  };


handleEvaluate = () => {
  this.setAnswer(this.evaluate())
  this.addCalculation();
  this.setState({
    input: this.evaluate()
  }) 
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

let result = this.state.calcRecord + " = " + answer
console.log(`result is: ${result}, setting test equal to it..`)

const { calcList } = this.state;
this.setState({ test: result })

if (calcList.length < 10){
  this.setState({ 
    calcRecord: result,
    calcList: calcList.unshift(result)
  });
} else if (calcList.length >= 10) {
  this.setState({ calcList: calcList.pop()})
  this.setState({ 
    calcRecord: result,
    calcList: calcList.unshift(result)
  });
}}


  subtract = () => {
    this.setState({
      previousNumber: this.state.input,
      input: "",
      operator: "subtract",
      calcRecord: this.state.calcRecord + " - "
    })
  };

  multiply = () => {
    this.setState({
      previousNumber: this.state.input,
      input: "",
      operator: "multiply",
      calcRecord: this.state.calcRecord + " * "
    })  };

  divide = () => {
    this.setState({
      previousNumber: this.state.input,
      input: "",
      operator: "divide",
      calcRecord: this.state.calcRecord + " / "
    })
  };

  render() {
    // const { calculations } = this.state;
    return (
      <div className="App">

        <div className="calcArea">
          {this.state.calculations.map(this.renderCalculation)}
        </div>

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

        <NumberList calcList={this.state.test} />
        </div>
      </div>
    );
  }
}

export default App;












// submit = (event) => {
//   event.preventDefault();

//   const payload = {
//     calculation: this.state.calcRecord
//   };

//   axios({
//     url: 'http://localhost:8080/api/save',
//     method: 'POST',
//     data: payload
//   })
//   .then(() => {
//     console.log('Data has been sent to server')
//   })
//   .catch(() => {
//     console.log('Internal server error')
//   });

// }