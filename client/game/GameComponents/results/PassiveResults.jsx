import React from "react";
import ResultsTimer from "./ResultsTimer.jsx";


import { Centered } from "meteor/empirica:core";
import SymbolDisplay from "../SymbolDisplay.jsx";
import SymbolDisplayPassiveResults from "../SymbolDisplayPassiveResults.jsx";


export default class PassiveResults extends React.Component {


    renderPassiveResults = () => {
        const {stage, round, player, game} = this.props;

        const symbolWidth = 225;
        const symbolSetContainerWidth = symbolWidth * 3.5;

        const message = "These are some outcomes from other teams";
        const completedRequests = player.round.get("completedRequests");
        let passiveOutcomes = []
        const passivePairs = player.round.get("passiveOutcomes");
        passivePairs.forEach((pair) => {
            const {speaker, listener} = pair;
            const speakerPlayer = game.players.find((p) => p.get("nodeId") === speaker);
            const listenerPlayer = game.players.find((p)  => p.get("nodeId") === listener);
            
            const correctAnswer = speakerPlayer.round.get("puzzleAnswer");
            const speakerDescription = speakerPlayer.round.get("symbolDescription");
            const speakerPuzzleSet = speakerPlayer.round.get("puzzleSet");
            const listenerSubmission = listenerPlayer.round.get("symbolSubmitted");

            passiveOutcomes.push({answer: correctAnswer, description: speakerDescription, puzzleSet:speakerPuzzleSet, submission: listenerSubmission});
        })

        // passiveOutcomes.push({answer: "t1", description: "Test", puzzleSet: ["t1", "t2", "t3"], submission: "t1"});

        return(
          <div className="results-container">

              <div className="results-content">
                  <div className="results-text" onClick={() => player.stage.submit()}> Results From Trials on Your Team </div>
                  {/* <br></br> */}
                  <img src={`images/hr-color.png`} width="200px" height="3px" />
                  {/* <br></br> */}
                    <div className="results-symbol-set-container" style={{justifyContent: "flex-start"}}>
                    {
                      passiveOutcomes.map((outcome) => {
                        const {answer, description, puzzleSet, submission} = outcome;
    
                        const resultImg = answer === submission ? "images/symbols/circle-checkmark.svg" : "images/symbols/circle-cancel.svg";
                        const resultText = answer === submission ? "Correct" : "Incorrect";

                        return (
                        <div className="results-symbol-set">
                            <div className="results-symbol-display">
                                <div className="results-left-container" style={{width: `${symbolSetContainerWidth}px`}}>
                                    <div className="results-symbol-description">
                                        Speaker asked the Listener to select the : {description}
                                    </div>
                                    <div className="results-left-symbols-container" >               
                                        {puzzleSet.map((symbol) => {
                                                return(
                                                    <SymbolDisplayPassiveResults
                                                        key={symbol}
                                                        name={symbol}
                                                        selected={symbol === answer ? "selected" : ""}
                                                        width={`${symbolWidth}px`}
                                                        {...this.props}
                                                    />
                                                )
                                        })}
                                    </div>
                                    </div>
                                    
                                <div className="results-middle-container" style={{width:"225px"}}>
                                    <div className="results-symbol-description"> <br></br> </div>
                                    <img className="results-img" style={{width:"70px", height:"70px"}} src={`${resultImg}`}/>
                                    {resultText}
                                </div>
                                <div className="results-right-container" style={{width: "fit-content"}}>
                                    <div className="results-symbol-description">
                                        The Listener selected
                                    </div>
                                    <SymbolDisplayPassiveResults
                                        key={submission ? submission : `no selection white`}
                                        name={submission ? submission : `no selection white`}
                                        width={`${symbolWidth}px`}
                                        {...this.props}
                                    />
                                </div>
                            </div>
                            <img className="results-bar-separator" src={`images/hr-color.png`} width="200px" height="3px" />                           
                        </div>
                        )
                      }) 
                    }  
                    </div>
                  <ResultsTimer stage={stage}/>
              </div>
            </div>
        );
        
    }


  render() {
    const { stage, round, player, game } = this.props;
    
    return this.renderPassiveResults();
  }
}
