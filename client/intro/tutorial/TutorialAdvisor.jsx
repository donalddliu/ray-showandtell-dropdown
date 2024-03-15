import React from "react";
import '../../../public/css/intro.css'

import { Centered } from "meteor/empirica:core";

export default class TutorialAdvisor extends React.Component {
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
              <img src={`images/tutorial-images/Advisor Tutorial Circle.png`} width="100%" />
            </div>
            <div className="tutorial-info">
              <div className="intro-heading"> Advisor View  </div>
              <img src={`images/hr-color.png`} width="180px" height="2px"/>
              <div className="tutorial-body">
                If you are playing the role of an advisor, you will see the following screen. You can share with the listener the choice you would make given the “clue” shared by the speaker.               
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
