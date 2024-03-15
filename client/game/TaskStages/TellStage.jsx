import React, { Component } from 'react';
import SymbolDisplay from '../GameComponents/SymbolDisplay';

import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

import Timer from "../Timer.jsx";

const Dropdown = ({label, value, options, onChange}) => {
    return(
        <select value={value} onChange={onChange} defaultValue={""} >
            <option value="" disbaled="true" hidden> Select One </option>
            {
                options.map((option) => {
                    return (
                        <option value={option.value} > 
                            {option.label} 
                        </option>
                    )
                })
            }
        </select>
    )
}


class TellStage extends Component {
    constructor(props) {
        super(props);  
        this.state = {
          symbolDescription: "",
          descriptionLimit: 40,
        }
    }


    handleDropdownChange = event => {
        const el = event.currentTarget;

        event.preventDefault();
        this.setState({symbolDescription : el.value});
        console.log(this.state);
    }

    handleChange = event => {
        const el = event.currentTarget;
        // this.setState({ [el.name]: el.value.trim() });
        this.setState({ [el.name]: el.value });

    };

    handleSubmit = event => {
        const {game, round, stage, player} = this.props;
        event.preventDefault();

        const symbolDescription = this.state.symbolDescription;
        player.round.set("symbolDescription", symbolDescription); 
        stage.append("log", {
            verb: "symbolDescription",
            subjectId: player.id,
            object: symbolDescription,
            at: moment(TimeSync.serverTime(null, 1000)),
        });

        player.stage.set("submitted", true);

    }

    renderSymbols() {
        const {game, round, stage, player} = this.props;
        const puzzleAnswer = player.round.get("puzzleAnswer");
        const puzzleSet = player.round.get("puzzleSet");
        const {symbolDescription, descriptionLimit} = this.state;

        const options = game.get("labelOptions");

        return(
            puzzleSet.map((symbol) => {
                return (
                    <div className="task-description-symbol-container">
                        <SymbolDisplay
                            key={symbol}
                            name={symbol}
                            selected={puzzleAnswer === symbol ? "selected" : ""}
                            {...this.props}
                        />
                        {puzzleAnswer === symbol ? 
                            <form className="task-description-form-container" onSubmit={this.handleSubmit}>
                                <Dropdown
                                    value={symbolDescription}
                                    options={options}
                                    onChange={this.handleDropdownChange}
                                >
                                </Dropdown>
                                {/* <input
                                    maxLength={descriptionLimit}
                                    className="task-description-form"
                                    id="symbolDescripition"
                                    name="symbolDescription"
                                    value={symbolDescription}
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    required
                                />
                                <p>
                                    {symbolDescription.length} / {descriptionLimit} characters used
                                </p> */}
                                <div className="button-container">
                                    {/* <form> */}
                                        <button 
                                        className={!symbolDescription ? "arrow-button button-submit-disabled" : "arrow-button button-submit"} 
                                        disabled= {!symbolDescription ? true : false} 
                                        style={{marginTop: "20px"}}
                                        type="submit"> Submit </button> 
                                    {/* </form> */}
                                </div>
                            </form> :
                            null
                        }
                    </div>
                )
            })
        )
    }

    renderStage() {
        const {game, round, stage, player} = this.props;
        const {symbolDescription, descriptionLimit} = this.state;

        return (
            <div className="task-response-container">
                <div className="task-response-header">
                    {/* <header> Type a message into the box to get your teammate to select the highlighted symbol </header> */}
                    <div className="task-instruction-text"> Ask your partner to click on this shape by sending them a name or a label: </div>
                </div>
                <div className="task-response-body">
                    <div className="task-response">
                        {this.renderSymbols()}
                    </div>
                </div>
                <div className="task-response-footer-timer">
                    <Timer stage={stage} player={player} symbolDescription={symbolDescription}/>
                    {/* <form className="task-description-form-container" onSubmit={this.handleSubmit}>
                        <input
                            className="task-description-form"
                            id="symbolDescripition"
                            name="symbolDescription"
                            value={symbolDescription}
                            onChange={this.handleChange}
                            required
                        />
                    </form> */}
                </div>
                
            </div>
        );
    }

    renderSpeakerSubmitted() {
        const {game, round, stage, player} = this.props;

        return (
            <div className="task-response-container">
                <div className="task-response-header">
                    <div className="task-instruction-text"> Please wait until all Speakers have described their symbol </div>
                </div>
                <div className="task-response-body">
                </div>
                <div className="task-response-footer-timer">
                    <Timer stage={stage} player={player}/>
                </div>
            </div>
        )
    }

    renderWait() {
        const {game, round, stage, player} = this.props;

        return (
            <div className="task-response-container">
                <div className="task-response-header">
                    <div className="task-instruction-text"> Please wait until the Speaker provides a description </div>
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

            if (player.round.get("role") === "Speaker") {
                if (player.stage.get("submitted")) {
                    return this.renderSpeakerSubmitted();
                } else {
                    return this.renderStage();
                }
            } else {
                return this.renderWait();
            }
    }
}

export default TellStage;
