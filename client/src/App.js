import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import ClearButton from "./components/ClearButton";
import NumberList from "./components/NumberList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      previousNumber: "",
      currentNumber: "",
      operator: "",
      calcRecord: "",
      calculationArray: [""],
      calcList: [],
      evaluating: false,
    };
  }

  componentDidMount = () => {
    setInterval(() => this.getCalculations(), 1000);
  };

  getCalculations = (_) => {
    fetch("/calculations")
      .then((response) => response.json())
      .then((jsonResponse) => {
        return jsonResponse.data.map((calcObject) => calcObject.calc);
      })
      .then((calcArray) => {
        console.log(`got the calcs: ${calcArray}`);
        this.setState({ calculationArray: calcArray });
      })
      .catch((err) => console.error(err));
  };

  addCalculation = () => {
    fetch(`/calculations/add?calc=${this.state.calcRecord}`)
      .then(this.getCalculations)
      .catch((err) => console.error(err));
  };

  renderCalculation = ({ id, calc }) => {
    return <div key={id}>{calc}</div>;
  };

  clearCalculations = (_) => {
    fetch(`/clear`).catch((err) => console.error(err));
  };

  addToInput = (val) => {
    if (this.state.evaluating === true) {
      this.setState({
        input: val,
        calcRecord: val,
        currentNumber: val,
        evaluating: false,
      });
    } else if (this.state.input.slice(-1) === " " || !this.state.input) {
      this.setState({
        input: this.state.input + val,
        calcRecord: this.state.calcRecord + val,
        currentNumber: val,
      });
    } else {
      this.setState({
        input: this.state.input + val,
        calcRecord: this.state.calcRecord + val,
        currentNumber: this.state.currentNumber + val,
      });
    }
  };

  addZeroToInput = (val) => {
    if (this.state.input !== "") {
      this.setState({
        input: this.state.input + val,
        calcRecord: this.state.calcRecord + val,
        currentNumber: this.state.currentNumber + val,
      });
    }
  };

  addDecimal = (val) => {
    if (this.state.input.indexOf(".") === -1) {
      this.setState({
        input: this.state.input + val,
        calcRecord: this.state.calcRecord + val,
      });
    }
  };

  clearInput = () => {
    this.setState({
      input: "",
      calcRecord: "",
    });
  };

  handleEvaluate = () => {
    if (this.state.evaluating === true) {
      return;
    } else {
      this.setAnswer(this.evaluate());
      this.setState({
        input: this.evaluate(),
        evaluating: true,
      });
    }
  };

  evaluate = () => {
    let answer = 0;

    if (this.state.operator === "plus") {
      answer =
        parseFloat(this.state.previousNumber) +
        parseFloat(this.state.currentNumber);
    } else if (this.state.operator === "subtract") {
      answer =
        parseFloat(this.state.previousNumber) -
        parseFloat(this.state.currentNumber);
    } else if (this.state.operator === "multiply") {
      answer =
        parseFloat(this.state.previousNumber) *
        parseFloat(this.state.currentNumber);
    } else if (this.state.operator === "divide") {
      answer =
        parseFloat(this.state.previousNumber) /
        parseFloat(this.state.currentNumber);
    }
    return answer;
  };

  setAnswer = (answer) => {
    let newCalculation = this.state.calcRecord + " = " + answer;
    const { calcList } = this.state;

    if (calcList.length < 10) {
      this.setState({ calcRecord: newCalculation }, () => {
        this.addCalculation();
      });
    } else if (calcList.length >= 10) {
      this.setState({ calcList: calcList.shift() });
      this.setState({ calcRecord: newCalculation }, () => {
        this.addCalculation();
      });
    }
  };

  add = () => {
    this.setState({
      previousNumber: this.state.input,
      input: this.state.calcRecord + " + ",
      operator: "plus",
      calcRecord: this.state.calcRecord + " + ",
    });
  };

  subtract = () => {
    this.setState({
      previousNumber: this.state.input,
      input: this.state.calcRecord + " - ",
      operator: "subtract",
      calcRecord: this.state.calcRecord + " - ",
    });
  };

  multiply = () => {
    this.setState({
      previousNumber: this.state.input,
      input: this.state.calcRecord + " * ",
      operator: "multiply",
      calcRecord: this.state.calcRecord + " * ",
    });
  };

  divide = () => {
    this.setState({
      previousNumber: this.state.input,
      input: "",
      operator: "divide",
      calcRecord: this.state.calcRecord + " / ",
    });
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
          <div className="calcLogTitle">Calculation Log:</div>
          <NumberList calculationArray={this.state.calculationArray} />
        </div>
      </div>
    );
  }
}

export default App;
