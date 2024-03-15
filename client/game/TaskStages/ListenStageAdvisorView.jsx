import React, { Component } from 'react';
import SymbolButton from '../GameComponents/SymbolButton';

import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

import Timer from "../Timer.jsx";




class ListenStageAdvisorView extends Component {
    constructor(props) {
        super(props);  
    }

    handleButtonSelect= (symbolName) => {
        const {game, round, stage, player} = this.props;

        player.round.set("symbolSelected", symbolName)
        stage.append("log", {
          verb: "advisorSymbolSelected",
          subjectId: player.id,
          object: symbolName,
          at: moment(TimeSync.serverTime(null, 1000)),
        });
    
      }

    handleSubmit = event => {
        const {game, round, stage, player} = this.props;
        event.preventDefault();

        const symbolSelected = player.round.get("symbolSelected");
        player.round.set("symbolSubmitted", symbolSelected); 
        stage.append("log", {
            verb: "advisorSymbolSubmitted",
            subjectId: player.id,
            object: symbolSelected,
            at: moment(TimeSync.serverTime(null, 1000)),
        })

        const requestQueue = player.round.get("requestQueue");
        const removedRequest = requestQueue.shift(); // Removes first element from request queue
        player.round.set("requestQueue", requestQueue);
        const completedRequests = player.round.get("completedRequests"); // Add request and symbolSelected to completed requests array
        const completedRequest = {request: removedRequest, advice: symbolSelected}
        completedRequests.push(completedRequest);
        player.round.set("completedRequests", completedRequests);
        
        // Send advice back to the requestor
        const requestorId = removedRequest.requestorId;
        const requestorPlayer = game.players.find((p) => p.get("nodeId") === requestorId);
        const adviceDict = requestorPlayer.round.get("adviceReceived");
        adviceDict[player.get("nodeId")] = symbolSelected;
        requestorPlayer.round.set("adviceReceived", adviceDict); 

        stage.append("log", {
            verb: "completedRequest",
            subjectId: player.id,
            object: completedRequest,
            at: moment(TimeSync.serverTime(null, 1000)),
        })
        player.round.set("symbolSelected", "");

    }

    renderSymbolButtons(puzzleSet, selectedSymbol) {
        return (
            puzzleSet.map((symbol) => {
                return (
                    <SymbolButton
                        key={symbol}
                        name={symbol}
                        handleButtonSelect={(symbolName) => this.handleButtonSelect(symbolName)}
                        selected={selectedSymbol === symbol}
                        {...this.props}
                    />
                )
            })
        )
    }

    renderWait() {
        return (
            <div className="task-response-container">
                <div className="task-response-header">
                    <div className="task-instruction-text"> Please wait </div>
                </div>
            </div>
        )
    }


    renderAdvisorStage() {
        const {game, round, stage, player} = this.props;
        const requestQueue = player.round.get("requestQueue");
         
        if (requestQueue.length === 0) {
            return this.renderWait();
        } else {
            const {requestorId, requestorColor, speakerId, speakerColor, puzzleSet, symbolDescription} = requestQueue[0];

            const selected = player.round.get("symbolSelected");


            return (
                <div className="task-response-container">
                    <div className="task-response-header">
                        {/* <header> Player {requestorColor} has asked for your advice on the following puzzle </header>
                        <br></br>
                        <header> Choose the symbol that best represents the following description given by Player {speakerColor}: </header>
                        <header> {symbolDescription} </header> */}
                        <div className="task-instruction-text">Click on the <span style={{fontWeight: "bold"}}> {symbolDescription}</span> . </div> 
                    </div>
                    <div className="task-response-body">
                        <div className="task-response">
                            {this.renderSymbolButtons(puzzleSet, selected)}
                        </div>
                    </div>
                    <div className="task-response-footer">
                        <div className="button-container">
                            <form onSubmit={this.handleSubmit}>
                                <button 
                                className={!selected ? "arrow-button button-submit-disabled" : "arrow-button button-submit"} 
                                disabled= {!selected ? true : false}
                                style={{marginTop: "20px"}}
                                type="submit"> Submit </button> 
                            </form>
                        </div>
                    </div>
                    <div className="task-response-footer-timer">
                        <Timer stage = {stage} player={player}/>
                    </div>
                    
                </div>
            );
        }

    }


    render() {
        const {game, round, stage, player} = this.props;

        return this.renderAdvisorStage();
        
        
    }
}

export default ListenStageAdvisorView;
