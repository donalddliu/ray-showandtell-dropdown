import React, { Component } from 'react';
import SymbolDisplay from '../GameComponents/SymbolDisplay';
import Timer from "../Timer.jsx";



class ShowStage extends Component {
    constructor(props) {
        super(props);  
    }

    renderSymbols() {
        const {game, round, stage, player} = this.props;
        const puzzleAnswer = player.round.get("puzzleAnswer");
        const puzzleSet = player.round.get("puzzleSet");

        return(
            puzzleSet.map((symbol) => {
                return (
                    <SymbolDisplay
                        key={symbol}
                        name={symbol}
                        selected={puzzleAnswer === symbol ? "selected" : ""}
                        {...this.props}
                    />
                )
            })
        )
    }

    renderStage() {
        const {game, round, stage, player} = this.props;

        return (
            <div className="task-response-container">
                <div className="task-response-header">
                    <header> Type a message into the box to get your teammate to select the highlighted symbol </header>
                </div>
                <div className="task-response-body">
                    <div className="task-response">
                        {this.renderSymbols()}
                    </div>
                </div>
                <div className="task-response-footer">
                    <Timer stage={stage} player={player}/>

                </div>
                
            </div>
        );
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


    render() {
        const {game, round, stage, player} = this.props;

        if (player.round.get("role") === "Speaker") {
            return this.renderStage()
        } else {
            return this.renderWait()
        }
    }
}

export default ShowStage;
