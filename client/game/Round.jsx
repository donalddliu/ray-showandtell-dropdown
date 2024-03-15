import React from "react";

import RoundMetadata from "./GameComponents/profile/RoundMetadata.jsx";

import PlayerProfile from "./PlayerProfile.jsx";
import SocialExposure from "./SocialExposure.jsx";
import Task from "./Task.jsx";
import ShowStage from "./TaskStages/ShowStage.jsx";
import TellStage from "./TaskStages/TellStage.jsx";
import ListenStage from "./TaskStages/ListenStage.jsx";
import ChooseAdvisorsStage from "./TaskStages/ChooseAdvisorsStage.jsx";
import AdvisorList from "./GameComponents/AdvisorList.jsx";


// Mid Survey Imports
import MidSurveyOne from "../mid-survey/MidSurvey1.jsx";
import MidSurveyTwo from "../mid-survey/MidSurvey2.jsx";
import MidSurveyThree from "../mid-survey/MidSurvey3.jsx";
import MidSurveyFour from "../mid-survey/MidSurvey4.jsx";
import MidSurveyFive from "../mid-survey/MidSurvey5.jsx";
import ProgressBar from "../mid-survey/ProgressBar.jsx";
import Results from "./GameComponents/results/Results.jsx";
import Results2 from "./GameComponents/results/Results2.jsx";
import Results3 from "./GameComponents/results/Results3.jsx"; 
import Results4 from "./GameComponents/results/Results4.jsx";
import PassiveResults from "./GameComponents/results/PassiveResults.jsx";




export default class Round extends React.Component {

  renderPassiveTaskRound() {
    const { round, stage, player, game } = this.props;

    if (stage.displayName == "Result") {
      return (
        <div className="round">
          {/* <Results {...this.props} /> */}
          {/* <Results2 {...this.props} /> */}
          {/* <Results3 {...this.props} /> */}
          <Results4 {...this.props} />
        </div>
      )
    }
    if (stage.displayName == "Passive") {
      return (
        <div className="round">
          <PassiveResults {...this.props} />
        </div>
      )
    }
    else {
      return (
        <div className="round">
          <RoundMetadata {...this.props} />
          <div className="content">
            <div className="row">
              <div className="passive-col">
                {/* Display the stage for each type of role */}
                { stage.displayName == "Show" &&  <ShowStage {...this.props}/> }
                { stage.displayName == "Tell" &&  <TellStage {...this.props}/> }
                { stage.displayName == "Listen" &&  <ListenStage {...this.props}/>}
              </div>
            </div>
          </div>
        </div>
      );
    }

  }

  renderTaskRound() {
    const { round, stage, player, game } = this.props;

    if (stage.displayName == "Result") {
      return (
        <div className="round">
          {/* <Results {...this.props} /> */}
          {/* <Results2 {...this.props} /> */}
          {/* <Results3 {...this.props} /> */}
          <Results4 {...this.props} />
        </div>
      )
    } else {
      return (
        <div className="round">
          <RoundMetadata {...this.props} />
          <div className="content">
            <div className="row">
              <div className="active-left-col">
                {/* Display the stage for each type of role */}
                { stage.displayName == "Show" &&  <ShowStage {...this.props}/> }
                { stage.displayName == "Tell" &&  <TellStage {...this.props}/> }
                { stage.displayName == "Listen" &&  <ListenStage {...this.props}/>}
              </div>
              <div className="active-right-col">
                { stage.displayName == "Listen" && player.round.get("role") == "Listener" && <AdvisorList {...this.props}/>}
                {/* Add empty advisor list column to make game symmetric */}
                { stage.displayName != "Listen" && player.round.get("role") == "Listener" && <div className="advisor-list-container"> </div>}
                { player.round.get("role") != "Listener" && <div className="advisor-list-container" > </div>}
              </div>

            </div>

          </div>

        </div>
      );
    }
  }

  onNextSurveyStage = () => {
    const { round, stage, player, game } = this.props;
    const currentSurveyStage = player.round.get("surveyStageNumber");
    player.round.set("surveyStageNumber", currentSurveyStage + 1);
  }

  renderSurveySubmitted() {
    const { round, stage, player, game } = this.props;

    const numActivePlayers = game.players.filter(p => !p.get("inactive")).length;

    let numPlayersSubmitted = round.get("numPlayersSubmitted");
    let numPlayersNotSubmitted = numActivePlayers - numPlayersSubmitted;

    
    return (
      <div className="survey-wait-container">
        <img className="survey-wait-static-image" src={`images/title-please-hold.png`} />
        <div className="survey-wait-content">
          <h1 className="results-text">Waiting for all members to submit the survey </h1>
          <h1 className="results-text"> {numPlayersSubmitted}/{numActivePlayers} submitted </h1>
          <ProgressBar percentSubmitted={numPlayersSubmitted/numActivePlayers * 100} />
        </div>
      </div>
    );


  }

  renderSurveyRound() {
    const { round, stage, player, game } = this.props;

    const surveySubmitted = player.stage.get("submitted");
    const currentSurveyStage = player.round.get("surveyStageNumber");
    const surveyStageNumber = stage.name.split("_")[1]; // Survey 1_1 -> [Survey 1, 1]
    if (surveySubmitted) {
      return this.renderSurveySubmitted();
    }

    return (
      <div className="round">
        {currentSurveyStage == 1 && <MidSurveyOne {...this.props} onNext={this.onNextSurveyStage}/>}
        {currentSurveyStage == 2 && <MidSurveyTwo {...this.props} onNext={this.onNextSurveyStage}/>}
        {currentSurveyStage == 3 && <MidSurveyThree {...this.props} onNext={this.onNextSurveyStage}/>}
        {currentSurveyStage == 4 && <MidSurveyFour {...this.props} onNext={this.onNextSurveyStage}/>}
        {currentSurveyStage == 5 && <MidSurveyFive {...this.props}/>}
      </div>
    )
  }


  render() {
    const { round, stage, player, game } = this.props;

    if (stage.displayName == "Survey") {
      return (
        this.renderSurveyRound()
      )
    }  else {
      return (
        // this.renderTaskRound()
        this.renderPassiveTaskRound()
      )
    }
  }
}
