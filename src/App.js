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
      answer: "",
      calculations: [],
      calculation: {
        id: 1,
        calc: "sample calculation",
      },
      calculationList: "calculationListhi",
      calculationArray: [''],
      calcList: [],
      evaluating: false,
      jsonArray: []
    };
  }

//   generateKey = (pre) => {
//     return `${ pre }_${ new Date().getTime() }`;
// }

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
        // var joined = this.state.calculationArray.concat(calcArray);
        // this.setState({ calculationArray: calcArray })
      })
      .catch((err) => console.error(err));
  };

  addCalculation = () => {
    const { calculationArray } = this.state;
    console.log(`adding ${calculationArray[calculationArray.length - 1]} to the database`)

    fetch(
      `/calculations/add?calc=${calculationArray[calculationArray.length - 1]}`
    )
      // .then(response => response.json())
      .then(this.getCalculations)
      .catch((err) => console.error(err));
  };

  //
  renderCalculation = ({ id, calc }) => {
    return <div key={id}>{calc}</div>;
  };

  clearCalculations = (_) => {
    fetch(
      `/clear`
    )
    .catch((err) => console.error(err))
  }

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
    // if this.state.input is not empty then add zero
    if (this.state.input !== "") {
      this.setState({
        input: this.state.input + val,
        calcRecord: this.state.calcRecord + val,
        currentNumber: this.state.currentNumber + val,
      });
    }
  };

  addDecimal = (val) => {
    // if there is no decimal in input, then add the decimal
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

  // handleChange = () => {
  //   this.setState(this.setAnswer(this.evaluate()), this.addCalculation);
  // }

  handleEvaluate = () => {
    // this.addCalculation()
    if(this.state.evaluating === true) {
      // this.addCalculation();
      return;
    } else {
      // this.handleChange()
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
    // this.addCalculation(newCalculation)
    const { calcList } = this.state;
    // this.setState({ calculationList: newCalculation });

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
    // const { calculations } = this.state;
    return (
      <div key={ generateKey(data) } className="App">
        {/* <div className="calcArea">
          {this.state.calculations.map(this.renderCalculation)}
        </div> */}
        <div >
        <p key={ generateKey(data) } >HELLO{this.state.jsonArray}</p>
        </div>
        {/* <h1>HELLO H1 world

        </h1> */}

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
            {/* <ClearButton handleClear={this.clearCalculations}>Clear Calculations</ClearButton> */}
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
