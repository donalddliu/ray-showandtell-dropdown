import React from "react";
import '../../../public/css/intro.css'

import { Centered } from "meteor/empirica:core";

export default class TutorialEarnings extends React.Component {
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
              <img src={`images/tutorial-images/Correct Results Tutorial Circle.png`} width="100%" />
            </div>
            <div className="tutorial-info">
              <div className="intro-heading"> Earnings </div>
              <img src={`images/hr-color.png`} width="180px" height="2px"/>
              <div className="tutorial-body">
                { game.treatment.passiveMode ? 
                    <span> You will be asked to name abstract symbols for a fixed number of trials. Each time you and your partner correctly identify the abstract symbol, you will receive 1 point. We will be determining an appropriate point to bonus reward conversion based off user feedback and average game performance. </span>:
                    <span> Your team will be asked to name abstract symbols for a fixed number of trials. Every time a listener or advisor selects the correct symbol, your team will receive a bonus. A {game.treatment.slReward * 100}-cent bonus for a correct response from a listener and a {game.treatment.advisorReward * 100}-cent bonus for a correct response from an advisor. </span>  
                }
              </div>
              {/* <div className="tutorial-body">
                { game.treatment.passiveMode ? 
                    <span> You will be asked to name abstract symbols for a fixed number of trials. Each time you and your partner correctly identify the abstract symbol, you will receive a bonus of {game.treatment.slReward * 100}-cents. </span>:
                    <span> Your team will be asked to name abstract symbols for a fixed number of trials. Every time a listener or advisor selects the correct symbol, your team will receive a bonus. A {game.treatment.slReward * 100}-cent bonus for a correct response from a listener and a {game.treatment.advisorReward * 100}-cent bonus for a correct response from an advisor. </span>  
                }
              </div> */}
            </div>
          </div>
        </Centered>
        {hasPrev && <button className="arrow-button tutorial-prev-btn" type="button" onClick={onPrev} disabled={!hasPrev}>
          Previous
        </button>}
        { hasNext && <button className="arrow-button tutorial-next-btn" type="button" onClick={onNext}>
          Next
        </button>
        }
        
      </div>
    );
  }
}
