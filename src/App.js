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

  generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}

  componentDidMount = () => {
    this.getCalculations();
  };

  getCalculations = (_) => {
    fetch("/calculations")
      .then((response) => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse)
        this.setState({ jsonArray: jsonResponse })
        return jsonResponse.data.map(calcObject => calcObject.calc)
      })
      .then((calcArray) => {
        console.log(`got the calcs: ${calcArray}`)
        var joined = this.state.calculationArray.concat(calcArray);
        this.setState({ calculationArray: joined })
      })
      .catch((err) => console.error(err));
  };

  addCalculation = () => {
    const { calculationArray } = this.state;

    fetch(
      `/calculations/add?calc=${calculationArray[calculationArray.length - 1]}`
    )
      .then(this.getCalculations)
      .catch((err) => console.error(err));
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
    // if this.state.input is not empty then add zero, else add nothing
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
    if(this.state.evaluating === true) {
      return;
    } else {
    this.setAnswer(this.evaluate());
    this.addCalculation();
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
    var joined = this.state.calculationArray.concat(newCalculation);

    this.setState({ calculationArray: joined });
    if (calcList.length < 10) {
      this.setState({
        calcRecord: newCalculation,
        calculationArray: joined,
      },
      () => {
        this.addCalculation()
    });
    } else if (calcList.length >= 10) {
      this.setState({ calcList: calcList.shift() });
      this.setState({
        calcRecord: newCalculation,
        calculationArray: joined,
      },
      () => {
        this.addCalculation()
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
      <div key={ generateKey(data) } className="App">

        <div className="calc-wrapper">
          <div className=" row">
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
        <div key={ generateKey(data) } className="list-wrapper">
          <NumberList key={ generateKey(data) } calculationArray={this.state.calculationArray} />
        </div>
      </div>
    );
  }
}

export default App;


