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

export default class QuizOne extends React.Component {
  state = {modalIsOpen: false };

  componentDidMount() {
    const {player} = this.props;
    if (!player.get("attentionCheck1Tries")) {
      player.set("attentionCheck1Tries", 2);
    }
  }

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = event => {
    const { hasPrev, hasNext, onNext, onPrev, game, player } = this.props;
    event.preventDefault();
    if (this.state.response === 'two') {
        const currentTriesLeft = player.get("attentionCheck1Tries");
        const attentionCheck1Answer = this.state.response;
        player.set(`attentionCheck1-${currentTriesLeft}`, attentionCheck1Answer);
        onNext();
    } else {
      const currentTriesLeft = player.get("attentionCheck1Tries");
      const attentionCheck1Answer = this.state.response;
      player.set(`attentionCheck1-${currentTriesLeft}`, attentionCheck1Answer);
      player.set("attentionCheck1Tries", currentTriesLeft-1);

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
                    <label className="questionnaire-question">The current experiment provides you with an opportunity to work in a group and develop a social convention. The objective is to name an abstract symbol. A social convention exists when you and your team members decide to use the same name. The task will last for multiple trials. At the beginning of each trial, you will be randomly assigned to either a Speaker or Listener role.</label>
                    <p>----------------------------------------------------------------------------------------------------</p>                    
                    <label>How many roles are in this game?</label>
                    <Radio
                        selected={response}
                        name="response"
                        value="zero"
                        label="0"
                        onChange={this.handleChange}
                    />
                    <Radio
                        selected={response}
                        name="response"
                        value="one"
                        label="1"
                        onChange={this.handleChange}
                    />
                    <Radio
                        selected={response}
                        name="response"
                        value="two"
                        label="2"
                        onChange={this.handleChange}
                    />
                    <Radio
                        selected={response}
                        name="response"
                        value="three"
                        label="3"
                        onChange={this.handleChange}
                    />
                </div>
                <form className="questionnaire-btn-container" onSubmit={this.handleSubmit}>
                    <button 
                        className={!response ? "arrow-button button-submit-disabled" : "arrow-button button-submit"}
                        disabled={!response} type="submit"> Submit </button> 
                </form>
                {this.state.modalIsOpen && <AttentionCheckModal player={player} triesLeft={player.get("attentionCheck1Tries")} onCloseModal={this.onCloseModal} /> }

            </div>
      </Centered>
    );
  }
}
