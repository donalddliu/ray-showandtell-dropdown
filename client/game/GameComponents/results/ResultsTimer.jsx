import { StageTimeWrapper } from "meteor/empirica:core";
import React from "react";

class timer extends React.Component {
  render() {
    const { remainingSeconds, stage } = this.props;
    const classes = ["timer"];
    if (remainingSeconds <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    return (
      <div className={classes.join(" ")} style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <div>
          <div className="results-text">Next Trial In</div>
          <div className="results-text" style={{marginTop: "0px"}}>{remainingSeconds} seconds</div>
        </div> 
      </div>
    );
  }
}

export default (ResultsTimer = StageTimeWrapper(timer));
