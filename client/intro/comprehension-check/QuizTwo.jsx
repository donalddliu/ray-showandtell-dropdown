import React from "react";
import '../../../public/css/intro.css';

import { Centered } from "meteor/empirica:core";
import AttentionCheckModal from "./AttentionCheckModal";


const Radio = ({ selected, name, value, label, onChange }) => (
    <label className="questionnaire-radio">
        <input
        className="quiz-button"
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={onChange}
        />
        {label}
    </label>
);

export default class QuizTwo extends React.Component {
  state = {modalIsOpen: false };

  componentDidMount() {
    const {player} = this.props;
    if (!player.get("attentionCheck2Tries")) {
      player.set("attentionCheck2Tries", 2);
    }
  }

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = event => {
    const { hasPrev, hasNext, onNext, onPrev, game, player } = this.props;
    event.preventDefault();
    if (this.state.response === 'C') {
        const currentTriesLeft = player.get("attentionCheck2Tries");
        const attentionCheck2Answer = this.state.response;
        player.set(`attentionCheck2-${currentTriesLeft}`, attentionCheck2Answer);
        onNext();
    } else {
      const currentTriesLeft = player.get("attentionCheck2Tries");
      const attentionCheck2Answer = this.state.response;
      player.set(`attentionCheck2-${currentTriesLeft}`, attentionCheck2Answer);
      player.set("attentionCheck2Tries", currentTriesLeft-1);

      if (currentTriesLeft-1 <= 0) {
        player.exit("failedQuestion");
      } else {
        this.onOpenModal();
      }
    }
  };

  onOpenModal = () => {
    this.setState({modalIsOpen: true});
  }

  onCloseModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    const { player, game } = this.props;
    const { response } = this.state;

    return (
      <Centered>
        <div className="intro-heading questionnaire-heading"> Questionnaire </div>
            <div className="questionnaire-content-container">
                <div className="questionnaire-body">
                    <label className="questionnaire-question">
                        The Speaker will be given {game.treatment.tellDuration} seconds to describe a highlighted symbol using a name or a label. If the Speaker enters the word sumo for the symbol, the Listener will receive the following message. Descriptions will be limited to a maximum of 40 characters. We do not care if the descriptions are short or long, we care more about how the team coordinates on the symbol. If you fail to submit a description within the allotted time, the game will assume you are no longer interested in playing and you will be removed from the game.
                        <br></br> <br></br>
                        The Listener will be given {game.treatment.listenDuration} seconds to select a symbol using the description provided by the Speaker. If you do not receive a description from a symbol, please do your best to guess a symbol and we will pair you with another player in the next round. If you fail to submit a symbol selection within the allotted time, the game will assume you are no longer interested in playing and you will be removed from the game.
                    </label>
                    <p>----------------------------------------------------------------------------------------------------</p>                    
                    <label>I will be removed from the game if I ...</label>
                    <Radio
                        selected={response}
                        name="response"
                        value="A"
                        label="A. Fail to submit a description as a Speaker"
                        onChange={this.handleChange}
                    />
                    <Radio
                        selected={response}
                        name="response"
                        value="B"
                        label="B. Fail to submit a symbol selection as a Listener"
                        onChange={this.handleChange}
                    />
                    <Radio
                        selected={response}
                        name="response"
                        value="C"
                        label="C. Both A and B"
                        onChange={this.handleChange}
                    />
                    <Radio
                        selected={response}
                        name="response"
                        value="D"
                        label="D. None of the above"
                        onChange={this.handleChange}
                    />
                </div>
                <form className="questionnaire-btn-container" onSubmit={this.handleSubmit}>
                    <button 
                        className={!response ? "arrow-button button-submit-disabled" : "arrow-button button-submit"}
                        disabled={!response} type="submit"> Submit </button> 
                </form>
                {this.state.modalIsOpen && <AttentionCheckModal player={player} triesLeft={player.get("attentionCheck2Tries")} onCloseModal={this.onCloseModal} /> }

            </div>
      </Centered>
    );
  }
}
