import React from "react";
import '../../../public/css/intro.css'

import { Centered } from "meteor/empirica:core";

export default class TutorialSpeaker extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <div className="tutorial-container">
        <div className="title-static-image">
          <img src={`images/title-tut3.png`} />
        </div>
        <Centered>
          <div className="two-col">
            <div className="tutorial-static-image">
              <img src={`images/tutorial-images/Speaker Tutorial Circle.png`} width="100%" />
            </div>
            <div className="tutorial-info">
              <div className="intro-heading"> Speaker View </div>
              <img src={`images/hr-color.png`} width="180px" height="2px"/>
              <div className="tutorial-body">
                The Speaker will be given {game.treatment.tellDuration} seconds to describe a highlighted symbol using a name or a label. If the Speaker enters the word sumo for the symbol, the Listener will receive the following message. Descriptions will be limited to a maximum of 40 characters. We do not care if the descriptions are short or long, we care more about how the team coordinates on the symbol. If you fail to submit a description within the allotted time, the game will assume you are no longer interested in playing and you will be removed from the game. 
              </div>
            </div>
          </div>
        </Centered>
        {hasPrev && <button className="arrow-button tutorial-prev-btn" type="button" onClick={onPrev} disabled={!hasPrev}>
          Previous
        </button>}
        
        {hasNext &&
        <button className="arrow-button tutorial-next-btn" type="button" onClick={onNext} disabled={!hasNext}>
          Next
        </button>
        }
      </div>
    );
  }
}
