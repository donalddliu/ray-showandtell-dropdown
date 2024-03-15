import { StageTimeWrapper } from "meteor/empirica:core";
import React from "react";
import PlayerCard from "./GameComponents/PlayerCard";

import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

class timer extends React.Component {
  render() {
    const { remainingSeconds, player, stage, symbolDescription } = this.props;

    const classes = ["timer"];
    if (remainingSeconds <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    if (remainingSeconds == 0 && !player.stage.get("submitted")) {
      if (player.round.get("role") === "Speaker") {
        if (symbolDescription.length > 0 ) {
          player.round.set("symbolDescription", symbolDescription); 
          stage.append("log", {
              verb: "symbolDescription",
              subjectId: player.id,
              object: symbolDescription,
              at: moment(TimeSync.serverTime(null, 1000)),
          });
        }
      } 
      if (player.round.get("role") === "Listener") {
        if (player.round.get("symbolSelected")) {

          const symbolSelected = player.round.get("symbolSelected");

          player.round.set("symbolSubmitted", symbolSelected); 
          stage.append("log", {
              verb: "listenerSymbolSubmitted",
              subjectId: player.id,
              object: symbolSelected,
              at: moment(TimeSync.serverTime(null, 1000)),
          })

        }
      }
      
      if (!player.stage.get("submitted")) {
        player.stage.set("submitted", true);
      }

    }

    if (stage.displayName === "Tell") {
      return (
        <div className={classes.join(" ")}>
        {
          player.round.get("role") === "Speaker" ? 
          <h4>Time Remaining</h4> :
          <h4>Time Remaining for Speakers</h4>
        }
        <span className="seconds">{remainingSeconds} seconds </span>
      </div>
      )
    } else if (stage.displayName === "Listen") {
      return (
        <div className={classes.join(" ")}>
        {
          player.round.get("role") === "Listener" ? 
          <h4>Time Remaining</h4> :
          <h4>Time Remaining for Listeners</h4>
        }
        <span className="seconds">{remainingSeconds} seconds </span>
      </div>
      )
    } else {
      return (
        <div className={classes.join(" ")}>
          <h4>Time Remaining</h4>
          <span className="seconds">{remainingSeconds} seconds </span>
        </div>
      );
    }

  }
}

export default (Timer = StageTimeWrapper(timer));
