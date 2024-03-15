import React, { Component } from 'react';
import PlayerCard from './PlayerCard';

import _ from 'lodash';
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import SymbolDisplay from './SymbolDisplay';

class AdvisorList extends Component {
    constructor(props) {
        super(props);
    }

    // handlePlayerSelect= (nodeId) => {
    //     const {game, round, stage, player} = this.props;        
    //     const numAdvisorsPerPair = game.treatment.numAdvisorsPerPair;

    //     const chosenAdvisors = player.round.get("chosenAdvisors");
    //     if (!chosenAdvisors.hasOwnProperty(nodeId)) {
    //         // Add to chosen advisors, and set their request used to false
    //         chosenAdvisors[nodeId] = false; // Keys are converted into strings
    //         player.round.set("chosenAdvisors", chosenAdvisors);

    //         // Open up the chatbox with the advisor
    //         const activeChats = player.round.get("activeChats");
    //         var pairOfPlayers = [player.get("nodeId"), nodeId];
    //         pairOfPlayers.sort((p1,p2) => p1 - p2);
    //         const chatKey = `${pairOfPlayers[0]}-${pairOfPlayers[1]}`;
    //         activeChats.push(chatKey);
    //         player.round.set("activeChats", activeChats);

    //         // Log that advisor was selected
    //         stage.append("log", {
    //             verb: "advisorSelected",
    //             subjectId: player.id,
    //             object: nodeId,
    //             at: moment(TimeSync.serverTime(null, 1000)),
    //           });
    //     }
    //     console.log("PlayerSelected");
    //     console.log(chosenAdvisors);
    // }

    // handlePlayerDeselect = (nodeId) => {
    //     const {game, round, stage, player} = this.props;        

    //     const chosenAdvisors = player.round.get("chosenAdvisors");
    //     if (chosenAdvisors.hasOwnProperty(nodeId) && chosenAdvisors[nodeId] !== true) {
    //         // Remove from advisors if advisor has not been used
    //         const removedAdvisorId = _.unset(chosenAdvisors, nodeId);
    //         console.log("player Deselected")
    //         console.log(chosenAdvisors);
    //         player.round.set("chosenAdvisors", chosenAdvisors);

    //         // Close the chatbox with the advisor
    //         const activeChats = player.round.get("activeChats");
    //         var pairOfPlayers = [player.get("nodeId"), nodeId];
    //         pairOfPlayers.sort((p1,p2) => p1 - p2);
    //         const chatKey = `${pairOfPlayers[0]}-${pairOfPlayers[1]}`;
    //         const newActiveChats = activeChats.filter((chat) => chat !== chatKey);
    //         player.round.set("activeChats", newActiveChats);
            
    //         // Log that advisor was deseleted
    //         stage.append("log", {
    //           verb: "advisorDeselected",
    //           subjectId: player.id,
    //           object: nodeId,
    //           at: moment(TimeSync.serverTime(null, 1000)),
    //         });
    //     }

    // }


    renderAdvisorList() {
        const {game, round, stage, player} = this.props;
        const chosenAdvisors = player.round.get("chosenAdvisors");
        const puzzleSet = player.round.get("puzzleSet");
        const adviceReceived = player.round.get("adviceReceived"); // {advisorId: symbolSelected}

        return(
            <div className="advisor-list-container">
                <h3 className="advisor-list-header">
                    Your Advisor List
                </h3>
                {chosenAdvisors.map((advisor) => {
                    const advisorPlayer = game.players.find((p) => p.get("nodeId") === advisor);
                    const advisorColor = advisorPlayer.get("anonymousName");

                    return (
                            <div className="advisor-container">
                                <PlayerCard
                                    key={advisor}
                                    name={advisorColor}
                                    {...this.props}
                                />
                                <div className="advisor-advice-container">
                                    {adviceReceived.hasOwnProperty(advisor) ? 
                                        puzzleSet.map((symbol) => {
                                            return (
                                                <SymbolDisplay
                                                    key={symbol}
                                                    name={symbol}
                                                    selected={adviceReceived[advisor] === symbol ? "selected" : ""}
                                                    {...this.props}
                                                />
                                            )
                                        })
                                        :
                                        "Waiting on advice..."
                                    }
                                </div>

                            </div>
                    )
                })}
            </div>

        )
    }

    render() {
        const {game, round, stage, player} = this.props;
        return (
            this.renderAdvisorList()
        );
    }
}

export default AdvisorList;
