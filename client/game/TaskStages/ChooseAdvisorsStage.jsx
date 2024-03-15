import React, { Component } from 'react';
import PlayerCard from '../GameComponents/PlayerCard';

import _ from 'lodash';
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

class ChooseAdvisorsStage extends Component {
    constructor(props) {
        super(props);  
    }

    handlePlayerSelect= (nodeId) => {
        const {game, round, stage, player} = this.props;        
        const numAdvisorsPerPair = game.treatment.numAdvisorsPerPair;

        const chosenAdvisors = player.round.get("chosenAdvisors");
        if (chosenAdvisors.length < numAdvisorsPerPair) {
            chosenAdvisors.push(nodeId);
            player.round.set("chosenAdvisors", chosenAdvisors);

            stage.append("log", {
                verb: "advisorSelected",
                subjectId: player.id,
                object: nodeId,
                at: moment(TimeSync.serverTime(null, 1000)),
              });
        }
    }

    handlePlayerDeselect = (nodeId) => {
        const {game, round, stage, player} = this.props;        

        const chosenAdvisors = player.round.get("chosenAdvisors");
        const removedAdvisorId = _.remove(chosenAdvisors, (id) => id === nodeId);
        player.round.set("chosenAdvisors", chosenAdvisors);

        stage.append("log", {
          verb: "advisorDeselected",
          subjectId: player.id,
          object: nodeId,
          at: moment(TimeSync.serverTime(null, 1000)),
        });

    }

    handleSubmit = event => {
        const {game, round, stage, player} = this.props;
        event.preventDefault();
        const allRoles = round.get("allRoles");
        let currentTeam;
        for (let pair of allRoles) {
            let {speaker, listener, availableAdvisors, chosenAdvisors} = pair;
            if (listener === player.get("nodeId")) {
                pair.chosenAdvisors = player.round.get("chosenAdvisors"); // Update chosen advisors within allRoles
                currentTeam = pair;
                pair.chosenAdvisors.forEach((advisor) => {
                    const advisorPlayer = game.players.find((p) => p.get("nodeId") === advisor);
                    advisorPlayer.round.set("role", "Advisor");
                    if (!advisorPlayer.round.get("pairedListeners")) { //If advisor first time being chosen
                        advisorPlayer.round.set("pairedListeners", []);
                        advisorPlayer.round.set("pairedSpeakers", []);
                    }
                    let updatedListeners = advisorPlayer.round.get("pairedListeners");
                    updatedListeners.push(listener);
                    let updatedSpeakers = advisorPlayer.round.get("pairedSpeakers");
                    updatedSpeakers.push(speaker);

                    advisorPlayer.round.set("pairedListeners", updatedListeners);
                    advisorPlayer.round.set("pairedSpeakers", updatedSpeakers);
                })
            }
        }


        round.set("allRoles", allRoles); 
        stage.append("log", {
            verb: "advisorsChosen",
            subjectId: player.id,
            object: currentTeam,
            at: moment(TimeSync.serverTime(null, 1000)),
        })
        player.stage.set("submitted", true);
    }

    renderPlayerCards() {
        const {game, round, stage, player} = this.props;
        const availableAdvisors = player.round.get("availableAdvisors");
        const chosenAdvisors = player.round.get("chosenAdvisors");

        return(
            availableAdvisors.map((nodeId) => {
                return (
                    <PlayerCard
                        key={nodeId}
                        name={nodeId}
                        handlePlayerSelect={(nodeId) => this.handlePlayerSelect(nodeId)}
                        handlePlayerDeselect={(nodeId) => this.handlePlayerDeselect(nodeId)}
                        selected={chosenAdvisors.includes(nodeId)}
                        {...this.props}
                    />
                )
            })
        )
    }

    renderListenerSubmitted() {
        return (
            <div className="task-response-container">
                <div className="task-response-header">
                    <header> Please wait until all Listeners have chosen their advisors </header>
                </div>
            </div>
        )
    }

    renderWait() {
        return (
            <div className="task-response-container">
                <div className="task-response-header">
                    <header> Please wait </header>
                </div>
            </div>
        )
    }

    renderStage() {
        const {game, round, stage, player} = this.props;
        const numAdvisorsPerPair = game.treatment.numAdvisorsPerPair;

        return (
            <div className="task-response-container">
                <div className="task-response-header">
                    <header> From the following, choose up to {numAdvisorsPerPair} advisors to help you: </header>
                </div>
                <div className="task-response-body">
                    <div className="task-response">
                        {this.renderPlayerCards()}
                    </div>
                </div>
                <div className="task-response-footer">
                    {/* Submit Button */}
                    <div className="button-container">
                        <form onSubmit={this.handleSubmit}>
                            <button 
                            className={"arrow-button button-submit"} 
                            type="submit"> Submit </button> 
                        </form>
                    </div>

                </div>
                
            </div>
        );
    }


    render() {
        const {game, round, stage, player} = this.props;

        if (player.round.get("role") === "Listener"){
            if (player.stage.get("submitted")) {
                return this.renderListenerSubmitted()
            } else {
                return this.renderStage()
            }
        } else {
            return this.renderWait()
        }
    }
}

export default ChooseAdvisorsStage;