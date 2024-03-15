import React from "react";
import ResultsTimer from "./ResultsTimer.jsx";


import { Centered } from "meteor/empirica:core";
import SymbolDisplay from "../SymbolDisplay.jsx";
import SymbolDisplayResults from "../SymbolDisplayResults.jsx";


export default class Results4 extends React.Component {

  renderSpeakerResults = () => {
    const { stage, round, player, game } = this.props;
    const symbolWidth = 300;
    const symbolWidth2Listeners = 240;
    const symbolSetContainerWidth = symbolWidth * 3.5;
    const symbolSetContainerWidth2 = symbolWidth2Listeners * 3.5;



    const speakerPuzzleSet = player.round.get("puzzleSet");
    const speakerPuzzleAnswer = player.round.get("puzzleAnswer");
    const listenerId = player.round.get("pairedListener");
    const listenerPlayer = game.players.find((p)  => p.get("nodeId") === listenerId);
    const listenerAnswer = listenerPlayer.round.get("symbolSubmitted");

    const symbolDescription = player.round.get("symbolDescription");
    const resultImg = listenerAnswer === speakerPuzzleAnswer ? "images/symbols/circle-checkmark.svg" : "images/symbols/circle-cancel.svg";
    const resultText = listenerAnswer === speakerPuzzleAnswer ? "Correct" : "Incorrect";


    let listenerId2;
    let listenerPlayer2;
    let listenerAnswer2;
    let resultImg2;
    let resultText2;
    if (player.round.get("pairedListener2")) {
        listenerId2 = player.round.get("pairedListener2");
        listenerPlayer2 = game.players.find((p) => p.get("nodeId") === listenerId2);
        listenerAnswer2 = listenerPlayer2.round.get("symbolSubmitted");
        resultImg2 = listenerAnswer2 === speakerPuzzleAnswer ? "images/symbols/circle-checkmark.svg" : "images/symbols/circle-cancel.svg";
        resultText2 = listenerAnswer2 === speakerPuzzleAnswer ? "Correct" : "Incorrect";
    }



    return(
        <div className="results-container">
            <div className="results-content">
                <div className="results-text" onClick={() => player.stage.submit()}> Results From Your Trial </div>
                <img src={`images/hr-color.png`} width="200px" height="3px" />
                {!player.round.get("pairedListener2") ? 
                    <div className="results-symbol-set-container">
                    {/* <div className="results-symbol-description">
                        Speaker, you asked the Listener to select the : {symbolDescription}
                    </div> */}
                    <div className="results-symbol-display">
                        <div className="results-left-container" style={{width: `${symbolSetContainerWidth}px`}}>
                            <div className="results-symbol-description">
                                Speaker asked the Listener to select the : {symbolDescription}
                            </div>
                            <div className="results-left-symbols-container">               
                                {speakerPuzzleSet.map((symbol) => {
                                    return (
                                        <SymbolDisplayResults
                                            key={symbol}
                                            name={symbol}
                                            width={`${symbolWidth}px`}
                                            selected={symbol === speakerPuzzleAnswer ? "selected" : ""}
                                            {...this.props}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        <div className="results-middle-container">
                            <div className="results-symbol-description"> <br></br> </div>
                            <img className="results-img" style={{width:"100px", height:"100px"}} src={`${resultImg}`}/>
                            {resultText}
                        </div>

                        <div className="results-right-container" style={{width: "fit-content"}}>
                            <div className="results-symbol-description">
                                The Listener selected
                            </div>
                                <SymbolDisplayResults
                                    key={listenerAnswer ? listenerAnswer : `no selection white`}
                                    name={listenerAnswer ? listenerAnswer : `no selection white`}
                                    width={`${symbolWidth}px`}
                                    {...this.props}
                                />
                        </div>
                    </div>
                    
                </div>

                :

                // If there are 2 Listeners
                <div className="results-symbol-set-container" style={{justifyContent: "flex-start"}}>
                    {/* <div className="results-symbol-description">
                        Speaker, you asked the Listener to select the : {symbolDescription}
                    </div> */}
                    <div className="results-symbol-display">
                        <div className="results-left-container" style={{width: `${symbolSetContainerWidth2}px`}}>
                            <div className="results-symbol-description">
                                Speaker asked the Listener to select the : {symbolDescription}
                            </div>
                            <div className="results-left-symbols-container">               
                                {speakerPuzzleSet.map((symbol) => {
                                    return (
                                        <SymbolDisplayResults
                                            key={symbol}
                                            name={symbol}
                                            width={`${symbolWidth2Listeners}px`}
                                            selected={symbol === speakerPuzzleAnswer ? "selected" : ""}
                                            {...this.props}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        <div className="results-middle-container" style={{width: "12.5%"}}>
                            <div className="results-symbol-description"> <br></br> </div>
                            <img className="results-img" style={{width:"100px", height:"100px"}} src={`${resultImg}`}/>
                            {resultText}
                        </div>

                        <div className="results-right-container" style={{width: "fit-content"}}>
                            <div className="results-symbol-description">
                                The Listener selected
                            </div>
                            <SymbolDisplayResults
                                    key={listenerAnswer ? listenerAnswer : `no selection white`}
                                    name={listenerAnswer ? listenerAnswer : `no selection white`}
                                    width={`${symbolWidth2Listeners}px`}
                                    {...this.props}
                            />
                        </div>
                    </div>
                    <div className="results-symbol-display">
                        <div className="results-left-container" style={{width: `${symbolSetContainerWidth2}px`}}>
                            <div className="results-symbol-description">
                                Speaker asked the Listener to select the : {symbolDescription}
                            </div>
                            <div className="results-left-symbols-container">               
                                {speakerPuzzleSet.map((symbol) => {
                                    return (
                                        <SymbolDisplayResults
                                            key={symbol}
                                            name={symbol}
                                            width={`${symbolWidth2Listeners}px`}
                                            selected={symbol === speakerPuzzleAnswer ? "selected" : ""}
                                            {...this.props}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        <div className="results-middle-container" style={{width: "12.5%"}}>
                            <div className="results-symbol-description"> <br></br> </div>
                            <img className="results-img" style={{width:"100px", height:"100px"}} src={`${resultImg2}`}/>
                            {resultText2}
                        </div>

                        <div className="results-right-container" style={{width: "fit-content"}}>
                            <div className="results-symbol-description">
                                The Listener selected
                            </div>
                            <SymbolDisplayResults
                                    key={listenerAnswer2 ? listenerAnswer2 : `no selection white`}
                                    name={listenerAnswer2 ? listenerAnswer2 : `no selection white`}
                                    width={`${symbolWidth2Listeners}px`}
                                    {...this.props}
                            />
                        </div>
                    </div>
                </div> 
                }
                { (!(listenerAnswer) || (player.round.get("pairedListener2") && !(listenerAnswer2))) ?
                    <div className="task-description-missing-text">
                        Your partner did not select a symbol.
                        <br></br>
                        You will be given a different partner in the next round.
                    </div> 
                    : 
                    null
                }

                <img className="results-bar-separator" src={`images/hr-color.png`} width="200px" height="3px" />
                <ResultsTimer stage={stage}/>
            </div>
        </div>
    );

  }

  renderListenerResults = () => {
    const { stage, round, player, game } = this.props;

    const symbolWidth = 300;
    const symbolSetContainerWidth = symbolWidth * 3.5;


    const listenerPuzzleSet = player.round.get("puzzleSet");
    const listenerPuzzleAnswer = player.round.get("puzzleAnswer");
    const listenerAnswer = player.round.get("symbolSubmitted");

    const speakerId = player.round.get("pairedSpeaker");
    const speakerPlayer = game.players.find((p) => p.get("nodeId") === speakerId);
    const speakerPuzzleSet = speakerPlayer.round.get("puzzleSet")
    const speakerPuzzleAnswer = speakerPlayer.round.get("puzzleAnswer");
    const symbolDescription = speakerPlayer.round.get("symbolDescription");

    const resultImg = listenerAnswer === speakerPuzzleAnswer ? "images/symbols/circle-checkmark.svg" : "images/symbols/circle-cancel.svg";
    const resultText = listenerAnswer === speakerPuzzleAnswer ? "Correct" : "Incorrect";

    return(
        <div className="results-container">
            <div className="results-content">
                <div className="results-text" onClick={() => player.stage.submit()}> Results From Your Trial </div>
                <img src={`images/hr-color.png`} width="200px" height="3px" />
                <div className="results-symbol-set-container">
                    {/* <div className="results-symbol-description">
                        Speaker, you asked the Listener to select the : {symbolDescription}
                    </div> */}
                    <div className="results-symbol-display">
                        <div className="results-left-container" style={{width: `${symbolSetContainerWidth}px`}}>
                            <div className="results-symbol-description">
                                Speaker asked the Listener to select the : {symbolDescription}
                            </div>
                            <div className="results-left-symbols-container">               
                                {speakerPuzzleSet.map((symbol) => {
                                    return (
                                        <SymbolDisplayResults
                                            key={symbol}
                                            name={symbol}
                                            width={`${symbolWidth}px`}
                                            selected={symbol === speakerPuzzleAnswer ? "selected" : ""}
                                            {...this.props}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        <div className="results-middle-container">
                            <div className="results-symbol-description">
                                <br></br>
                            </div>
                                <img className="results-img" style={{width:"100px", height:"100px"}} src={`${resultImg}`}/>
                            <div>
                                {resultText}
                            </div>
                            
                        </div>


                        <div className="results-right-container" style={{width: "fit-content"}}>
                            <div className="results-symbol-description">
                                The Listener selected
                            </div>
                            <SymbolDisplayResults
                                key={listenerAnswer}
                                name={listenerAnswer}
                                width={`${symbolWidth}px`}
                                {...this.props}
                            />
                        </div>
                    </div>
                </div>
                <img className="results-bar-separator" src={`images/hr-color.png`} width="200px" height="3px" />
                <ResultsTimer stage={stage}/>
            </div>
        </div>
    );
  }


  renderAdvisorResults = () => {
    const { stage, round, player, game } = this.props;

    const completedRequests = player.round.get("completedRequests");

    return(
      <div className="results-container">
          <div className="results-content">
              <div className="results-text"> Results </div>
              <img src={`images/hr-color.png`} width="200px" height="3px" />
                <div className="results-symbol-set-container">
                {
                  completedRequests.map((request) => {

                    const listenerId = request['request']['requestorId'];
                    const listenerPuzzleSet = request['request']['puzzleSet'];
                    const listenerPlayer = game.players.find((p) => p.get("nodeId") === listenerId);
                    const listenerPuzzleAnswer = listenerPlayer.round.get("puzzleAnswer");
                    const listenerAnswer = listenerPlayer.round.get("symbolSubmitted");
                    const symbolDescription = request['request']['symbolDescription'];

                    const advisorReply = request['advice'];

                    const resultImg = advisorReply === listenerPuzzleAnswer ? "images/symbols/circle-checkmark.svg" : "images/symbols/circle-cancel.svg";


                    return (
                    <div>
                        <div className="results-symbol-description">
                            The listener was asked to select the : {symbolDescription}
                        </div>
                        <div className="results-symbol-display">
                            <div className="results-side-symbol">
                                Symbol Selected
                                <SymbolDisplayResults
                                    key={advisorReply}
                                    name={advisorReply}
                                    {...this.props}
                                />
                                </div>

                            <img className="results-img" src={`${resultImg}`}/>

                            <div className="results-side-symbol">
                                Correct Symbol
                                <SymbolDisplayResults
                                    key={listenerPuzzleAnswer}
                                    name={listenerPuzzleAnswer}
                                    {...this.props}
                                />
                            </div>
                        </div>
                        <img className="results-bar-separator" src={`images/hr-color.png`} width="200px" height="3px" />
                        <div className="results-symbol-description">
                            Symbol Description: {symbolDescription}
                        </div>
                        <div className="results-symbol-display">
                            <div className="results-side-symbol">
                                Symbol Selected
                                <SymbolDisplayResults
                                    key={advisorReply}
                                    name={advisorReply}
                                    {...this.props}
                                />
                            </div>

                            <div className="results-side-symbol">
                                Correct Symbol
                                <SymbolDisplayResults
                                    key={listenerPuzzleAnswer}
                                    name={listenerPuzzleAnswer}
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

    const correctMessage = "Your team was correct, congratulations!";
    const incorrectMessage = "Your team was not correct, better luck on the next one.";


    if (player.round.get("role") === "Listener") {
      return this.renderListenerResults();
    } else if (player.round.get("role") === "Speaker") {
      return this.renderSpeakerResults();
    } else if (player.round.get("role") === "Advisor") {
      return this.renderAdvisorResults();
    }
      
    // return (
    //   <div className="results-container">
    //     <div className="results-content">
    //         <h1 className="results-text"> {result ? correctMessage : incorrectMessage} </h1>
    //         <img src={`images/hr-color.png`} width="200px" height="3px" />


    //         <ResultsTimer stage={stage}/>
    //     </div>
    //   </div>
    // );
  }
}
