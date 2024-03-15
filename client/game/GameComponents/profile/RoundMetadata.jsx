import React from "react";

import "../../../../public/css/profiletab.css";

export default class RoundMetadata extends React.Component {
  renderProfile() {
    const { player, game } = this.props;
    const role = player.round.get("role");
    // const pairedSpeakers = role === "Advisor" ? player.round.get("pairedSpeakers") : player.round.get("pairedSpeaker");
    // const pairedListeners = role === "Advisor" ? player.round.get("pairedListeners") : player.round.get("pairedListener");
    // const advisors = role === "Listener" ? Object.keys(player.round.get("chosenAdvisors")) : "";
    return (
      <div className="profile-container">
        {/* <h4> Name : {player.get("anonymousName")} </h4> */}
        <div className="profile-role-text"> Your Role : {player.round.get("role")}  {player.get("nodeId")}</div>
        {/* <div className="profile-tab-icon">
          <div div className="profile-icon">
            <img className={`${player.get("anonymousName").toLowerCase()}`}src={`images/profile-icons/profile-${player.round.get("role").toLowerCase()}.svg`} />
          </div>
        </div> */}
      </div>
    );
  }

  renderEarnings() {
    const { player, game } = this.props;
    return (
      <div className="earnings-container">
        {/* <div className="earnings-text">Earnings: {(player.get("score") || 0).toFixed(2)} </div> */}
        <div className="earnings-text">Score: {(player.get("score") || 0).toFixed(2)} </div>

      </div>
    );
  }

  renderTrials() {
    const {stage, game} = this.props;
    const stageNum = stage.name.split(" ")[1];
    const totalTaskRounds = game.treatment.numTaskRounds;
    return (
        <div className="round-number-container">
            <div className="round-number-text"> Task {stageNum} of {totalTaskRounds} </div>
        </div>
    )

  }

  render() {
    const { stage } = this.props;

    return (
      <div className="round-metadata-container">
        {this.renderTrials()}
        {this.renderProfile()}
        {this.renderEarnings()}
        {/* <Timer stage={stage} /> */}
      </div>
    );
  }
}
