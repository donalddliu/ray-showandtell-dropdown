import React from "react";

import Timer from "./Timer.jsx";
import "../../public/css/profiletab.css"

export default class PlayerProfile extends React.Component {
  renderProfile() {
    const { player, game } = this.props;
    const role = player.round.get("role");
    const pairedSpeakers = role === "Advisor" ? player.round.get("pairedSpeakers") : player.round.get("pairedSpeaker");
    const pairedListeners = role === "Advisor" ? player.round.get("pairedListeners") : player.round.get("pairedListener");
    const advisors = role === "Listener" ? Object.keys(player.round.get("chosenAdvisors")) : "";
    return (
      <div className="profile-score">
        <h3>Your Profile</h3>
        {/* <h4> Name : {player.get("anonymousName")} </h4> */}
        <h4> Role : {player.round.get("role")}</h4>
        {/* <div className="profile-tab-icon">
          <div div className="profile-icon">
            <img className={`${player.get("anonymousName").toLowerCase()}`}src={`images/profile-icons/profile-${player.round.get("role").toLowerCase()}.svg`} />
          </div>
        </div> */}
      </div>
    );
  }

  renderScore() {
    const { player, game } = this.props;
    return (
      <div className="profile-score">
        <h4>Total score</h4>
        <span>{(player.get("score") || 0).toFixed(2)}</span>
      </div>
    );
  }

  render() {
    const { stage } = this.props;

    return (
      <aside className="player-profile">
        {this.renderProfile()}
        {this.renderScore()}
        {/* <Timer stage={stage} /> */}
      </aside>
    );
  }
}
