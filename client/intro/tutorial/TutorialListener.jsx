import React from "react";
import '../../../public/css/intro.css'

import { Centered } from "meteor/empirica:core";

export default class TutorialListener extends React.Component {
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
              <img src={`images/tutorial-images/Listener Tutorial Circle.png`} width="100%" />
            </div>
            <div className="tutorial-info">
              <div className="intro-heading"> Listener View </div>
              <img src={`images/hr-color.png`} width="180px" height="2px"/>
              <div className="tutorial-body">
                The Listener will be given {game.treatment.listenDuration} seconds to select a symbol using the description provided by the Speaker. If you do not receive a description from a symbol, please do your best to guess a symbol and we will pair you with another player in the next round. If you fail to submit a symbol selection within the allotted time, the game will assume you are no longer interested in playing and you will be removed from the game.
                {!game.treatment.passiveMode ? <span> On some trials, the Listener can have one or more Advisors. The Advisors will be asked to share their response given the clue given to you by the speaker. Their responses will be shown on the right of the screen. </span> : ""}
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
