import Empirica from "meteor/empirica:core";
import { render } from "react-dom";
import ExitSurvey from "./exit/ExitSurvey";
import Thanks from "./exit/Thanks";
import Sorry from "./exit/Sorry";
import About from "./game/About";
import Round from "./game/Round";
import Consent from "./intro/Consent";

// Tutorial Imports
import TutorialOverview from "./intro/tutorial/TutorialOverview";
import TutorialProfile from "./intro/tutorial/TutorialProfile";
import TutorialSpeaker from "./intro/tutorial/TutorialSpeaker";
import TutorialListener from "./intro/tutorial/TutorialListener";
import TutorialAdvisor from "./intro/tutorial/TutorialAdvisor";
import TutorialResults from "./intro/tutorial/TutorialResults";
import TutorialEarnings from "./intro/tutorial/TutorialEarnings";

// Quiz Imports
import InstructionStepOne from "./intro/InstructionStepOne";
import InstructionStepTwo from "./intro/InstructionStepTwo";
import Quiz from "./intro/Quiz";
import NewPlayer from "./intro/NewPlayer";
import QuizOne from "./intro/comprehension-check/QuizOne";
import QuizTwo from "./intro/comprehension-check/QuizTwo";
import QuizThree from "./intro/comprehension-check/QuizThree";


// Set the About Component you want to use for the About dialog (optional).
Empirica.about(About);

// Set the Consent Component you want to present players (optional).
Empirica.consent(Consent);

// Set the component for getting the player id (optional)
Empirica.newPlayer(NewPlayer);

// Introduction pages to show before they play the game (optional).
// At this point they have been assigned a treatment. You can return
// different instruction steps depending on the assigned treatment.
Empirica.introSteps((game, treatment) => {
  // const steps = [InstructionStepOne];
  // if (treatment.playerCount > 1) {
  //   steps.push(InstructionStepTwo);
  // }
  // steps.push(Quiz);
  let steps = [];
  const tutorial = game.treatment.passiveMode ? 
  [TutorialOverview, TutorialSpeaker, TutorialListener, TutorialResults, TutorialEarnings, ] :
  [TutorialOverview, TutorialSpeaker, TutorialListener, TutorialAdvisor, TutorialResults, TutorialEarnings];
  ;
  const quiz = [QuizOne, QuizTwo, QuizThree];
  steps = steps.concat(tutorial, quiz);
  return steps;

});

// The Round component containing the game UI logic.
// This is where you will be doing the most development.
// See client/game/Round.jsx to learn more.
Empirica.round(Round);

// End of Game pages. These may vary depending on player or game information.
// For example we can show the score of the user, or we can show them a
// different message if they actually could not participate the game (timed
// out), etc.
// The last step will be the last page shown to user and will be shown to the
// user if they come back to the website.
// If you don't return anything, or do not define this function, a default
// exit screen will be shown.
Empirica.exitSteps((game, player) => {
  if (
    !game ||
    (player.exitStatus &&
      player.exitStatus !== "finished" &&
      player.exitReason !== "playerQuit")
  ) {
    return [Sorry];
  }
  return [ExitSurvey, Thanks];
});

// Start the app render tree.
// NB: This must be called after any other Empirica calls (Empirica.round(),
// Empirica.introSteps(), ...).
// It is required and usually does not need changing.
Meteor.startup(() => {
  render(Empirica.routes(), document.getElementById("app"));
});
