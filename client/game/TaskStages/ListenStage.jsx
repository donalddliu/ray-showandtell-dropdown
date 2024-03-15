import React, { Component } from 'react';

import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import ListenStageListenerView from './ListenStageListenerView';
import ListenStageAdvisorView from "./ListenStageAdvisorView";

class ListenStage extends Component {
    constructor(props) {
        super(props);  
    }

    renderWait() {
        const {game, round, stage, player} = this.props;
        return (
            <div className="task-response-container">
                <div className="task-response-header">
                    <div className="task-instruction-text"> Please wait until the Listener selects a symbol. </div>
                </div>
                <div className="task-response-body">
                </div>
                <div className="task-response-footer-timer">
                    <Timer stage={stage} player={player}/>
                </div>
            </div>
        )
    }


    render() {
        const {game, round, stage, player} = this.props;
        if (player.round.get("role") === "Listener"){
            return (
                <ListenStageListenerView {...this.props} />
            )
        } else if (player.round.get("role") === "Advisor") {
            return (
                <ListenStageAdvisorView {...this.props} />
            )
        } else {
            return this.renderWait();
        }      
    }
}

export default ListenStage;
