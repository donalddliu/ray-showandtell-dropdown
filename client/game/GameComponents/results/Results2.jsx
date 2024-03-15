import React from "react";
import ResultsTimer from "./ResultsTimer.jsx";


import { Centered } from "meteor/empirica:core";
import SymbolDisplay from "../SymbolDisplay.jsx";


export default class Results extends React.Component {

  renderSpeakerResults = () => {
    const { stage, round, player, game } = this.props;

    const correctMessage = "Your team was correct, congratulations!";
    const incorrectMessage = "Your team was not correct, better luck on the next one.";

    const result = player.round.get("taskCorrect");

    const speakerPuzzleSet = player.round.get("puzzleSet");
    const speakerPuzzleAnswer = player.round.get("puzzleAnswer");
    const listenerId = player.round.get("pairedListener");
    const listenerPlayer = game.players.find((p)  => p.get("nodeId") === listenerId);
    const listenerAnswer = listenerPlayer.round.get("symbolSubmitted");

    const symbolDescription = player.round.get("symbolDescription");


    return(
      <div className="results-container">
          <div className="results-content">
              <h1 className="results-text"> {result ? correctMessage : incorrectMessage} </h1>
              <img src={`images/hr-color.png`} width="200px" height="3px" />
              <div className="results-symbol-set-container">
                <div className="results-symbol-description">
                  Symbol Description: {symbolDescription}
                </div>
                <div className="results-symbol-display">
                  {
                    speakerPuzzleSet.map((symbol) => {
                      const isAnswer = symbol === speakerPuzzleAnswer;
                      const listenerPicked = symbol === listenerAnswer;
                      let borderColor;
                      if (isAnswer) {
                        borderColor = "correct";
                      } else if (listenerPicked && !isAnswer) {
                        borderColor = "wrong";
                      } else if (!listenerPicked) {
                        borderColor = "";
                      }
                      
                      return(
                        <div>
                          <div className="players-selected-container">
                            <div className="listeners-selected">
                              {symbol === listenerAnswer ? 
                                // <div>{listenerPlayer.get("anonymousName")}</div> : ""
                                <div className="profile-icon">
                                  <img className={`${listenerPlayer.get("anonymousName").toLowerCase()}`}src="images/profile-icons/profile-listener.svg" />
                                </div> : ""

                              }
                            </div>
                            <div className="advisors-selected">
                              
                            </div>
                          </div>  
                          <SymbolDisplay
                            key={symbol}
                            name={symbol}
                            selected={borderColor} 
                            {...this.props}
                          />
                        </div>
                      )
                    }) 
                  }  
                
                </div>  
              </div>
              <img className="results-bar-separator" src={`images/hr-color.png`} width="200px" height="3px" />
              <ResultsTimer stage={stage}/>
          </div>
        </div>
    );

  }

  renderListenerResults = () => {
    const { stage, round, player, game } = this.props;

    const correctMessage = "Your team was correct, congratulations!";
    const incorrectMessage = "Your team was not correct, better luck on the next one.";

    const result = player.round.get("taskCorrect");

    const listenerPuzzleSet = player.round.get("puzzleSet");
    const listenerPuzzleAnswer = player.round.get("puzzleAnswer");
    const listenerAnswer = player.round.get("symbolSubmitted");
    const adviceReceived = player.round.get("adviceReceived"); // {advisorId: symbolSelected}

    const speakerId = player.round.get("pairedSpeaker");
    const speakerPlayer = game.players.find((p) => p.get("nodeId") === speakerId);
    const symbolDescription = speakerPlayer.round.get("symbolDescription");


    return (
      <div className="results-container">
        <div className="results-content">
            <h1 className="results-text"> {result ? correctMessage : incorrectMessage} </h1>
            <img src={`images/hr-color.png`} width="200px" height="3px" />
            <div className="results-symbol-set-container">
              <div className="results-symbol-description">
                Symbol Description: {symbolDescription}
              </div>
              <div className="results-symbol-display">
                {
                  listenerPuzzleSet.map((symbol) => {
                    const isAnswer = symbol === listenerPuzzleAnswer;
                    const listenerPicked = symbol === listenerAnswer;
                    const advisorPicked = Object.values(adviceReceived).includes(symbol);
                    let borderColor;
                    if (isAnswer) {
                      borderColor = "correct";
                    } else if (advisorPicked || listenerPicked && !isAnswer) {
                      borderColor = "wrong";
                    } else if (!advisorPicked || !listenerPicked) {
                      borderColor = "";
                    }

                    return(
                      <div>
                        <div className="players-selected-container">
                          <div className="listeners-selected">
                            {symbol === listenerAnswer ? 
                              // <div>{player.get("anonymousName")}(You) </div> : ""
                              <div div className="profile-icon">
                                <img className={`${player.get("anonymousName").toLowerCase()}`}src="images/profile-icons/profile-listener.svg" />
                              </div> : ""
                            }
                          </div>
                          <div className="advisors-selected">
                            {
                              Object.keys(adviceReceived).map((a) => {
                                const selected = adviceReceived[a] === symbol;
                                const advisorPlayer = game.players.find((p) => p.get("nodeId") === parseInt(a));
                                if (selected) {
                                  // return <div> {advisorPlayer.get("anonymousName")} </div>
                                  return (
                                    <div div className="profile-icon">
                                      <img className={`${advisorPlayer.get("anonymousName").toLowerCase()}`}src="images/profile-icons/profile-advisor.svg" />
                                    </div>
                                  )
                                } else {
                                  return <div></div>
                                }
                              })
                            }
                          </div>
                        </div>  
                        <SymbolDisplay
                          key={symbol}
                          name={symbol}
                          selected={borderColor} 
                          {...this.props}
                        />
                      </div>
                    )
                  }) 
                }  
              
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
              <h1 className="results-text"> Results </h1>
              <img src={`images/hr-color.png`} width="200px" height="3px" />
                {
                  completedRequests.map((request) => {

                    const listenerId = request['request']['requestorId'];
                    const listenerPuzzleSet = request['request']['puzzleSet'];
                    const listenerPlayer = game.players.find((p) => p.get("nodeId") === listenerId);
                    const listenerPuzzleAnswer = listenerPlayer.round.get("puzzleAnswer");
                    const listenerAnswer = listenerPlayer.round.get("symbolSubmitted");
                    const symbolDescription = request['request']['symbolDescription'];

                    const advisorReply = request['advice'];

                    return (
                      <>
                      <div className="results-symbol-set-container">
                        <div className="results-symbol-description">
                          Symbol Description: {symbolDescription}
                        </div>
                        <div className="results-symbol-display">
                          {listenerPuzzleSet.map((symbol) => {
                            const isAnswer = symbol === listenerPuzzleAnswer;
                            const listenerPicked = symbol === listenerAnswer;
                            const advisorPicked = symbol === advisorReply;
                            let borderColor;
                            if (isAnswer) {
                              borderColor = "correct";
                            } else if (advisorPicked || listenerPicked && !isAnswer) {
                              borderColor = "wrong";
                            } else if (!advisorPicked || !listenerPicked) {
                              borderColor = "";
                            }

                            return(
                              <div>
                                <div className="players-selected-container">
                                  <div className="listeners-selected">
                                    {symbol === listenerAnswer ? 
                                      // <div>{listenerPlayer.get("anonymousName")}</div> : ""
                                      <div className="profile-icon">
                                        <img className={`${listenerPlayer.get("anonymousName").toLowerCase()}`}src="images/profile-icons/profile-listener.svg" />
                                      </div> : ""
                                    }
                                  </div>
                                  <div className="advisors-selected">
                                    {symbol === advisorReply ?
                                      // <div>{player.get("anonymousName")}</div> : ""
                                      <div className="profile-icon">
                                        <img className={`${player.get("anonymousName").toLowerCase()}`}src="images/profile-icons/profile-advisor.svg" />
                                      </div> : ""
                                    }
                                  </div>
                                </div>  
                                <SymbolDisplay
                                  key={symbol}
                                  name={symbol}
                                  selected={borderColor} 
                                  {...this.props}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <img className="results-bar-separator" src={`images/hr-color.png`} width="200px" height="3px" />
                      </>
                    )
                  }) 
                }  
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
