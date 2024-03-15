import React from "react";
import '../../../public/css/intro.css'

import { Centered } from "meteor/empirica:core";

export default class TutorialResults extends React.Component {
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
              <img src={`images/tutorial-images/Wrong Results Tutorial Circle.png`} width="100%" />
            </div>
            <div className="tutorial-info">
              <div className="intro-heading"> Results </div>
              <img src={`images/hr-color.png`} width="180px" height="2px"/>
              <div className="tutorial-body">
                After each trial, two sets of results will be displayed. We will show you the results from your most recent trial. The Speaker view along with the word the Speaker used to describe the symbol will be on the left. The symbol selected by the Listener will be on the right. If the two symbols match, you will see a green checkmark, indicating a correct response and successful coordination. Otherwise, you will see an X. 
                <br></br>

                To facilitate learning, we will also share results from trials on your team. The results will be presented using the same format as the result from your trial.
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
