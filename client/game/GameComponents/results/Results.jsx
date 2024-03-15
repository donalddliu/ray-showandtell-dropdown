import React from "react";
import ResultsTimer from "./ResultsTimer.jsx";


import { Centered } from "meteor/empirica:core";


export default class Results extends React.Component {

  render() {
    const { stage, round, player, game } = this.props;
    const result = player.round.get("taskCorrect");

    const correctMessage = "Your team was correct, congratulations!";
    const incorrectMessage = "Your team was not correct, better luck on the next one.";
      
    return (
      <div className="results-container">
        <div className="results-content">
            <h1 className="results-text"> {result ? correctMessage : incorrectMessage} </h1>
            <img src={`images/hr-color.png`} width="200px" height="3px" />
            <ResultsTimer stage={stage}/>
        </div>
      </div>
    );
  }
}
