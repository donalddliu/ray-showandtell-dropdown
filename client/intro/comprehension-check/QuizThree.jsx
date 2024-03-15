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
  state = {modalIsOpen: false, sum: "", horse: "" };

  componentDidMount() {
    const {player} = this.props;
    if (!player.get("attentionCheck3Tries")) {
      player.set("attentionCheck3Tries", 2);
    }
  }

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleSubmit = event => {
    const { hasPrev, hasNext, onNext, onPrev, game, player } = this.props;

    event.preventDefault();
    if (this.state.sum === '4' && this.state.horse === "white") {
        const currentTriesLeft = player.get("attentionCheck3Tries");
        const attentionCheck3Answer = {sum: this.state.sum, horse: this.state.horse};
        player.set(`attentionCheck3-${currentTriesLeft}`, attentionCheck3Answer);
        onNext();
    } else {
      const currentTriesLeft = player.get("attentionCheck3Tries");
      const attentionCheck3Answer = {sum: this.state.sum, horse: this.state.horse};
      player.set(`attentionCheck3-${currentTriesLeft}`, attentionCheck3Answer);
      player.set("attentionCheck3Tries", currentTriesLeft-1);

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
    const { sum, horse } = this.state;

    return (
      <Centered>
        <div className="intro-heading questionnaire-heading"> Questionnaire </div>
            <div className="questionnaire-content-container">
                <div className="questionnaire-body">
                    <label>What is 2+2?</label>
                    <input
                        type="text"
                        dir="auto"
                        id="sum"
                        name="sum"
                        placeholder="e.g. 3"
                        value={sum}
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <br></br>
                    <label> What color was Napoleon's white horse? </label>
                    <input
                        type="text"
                        dir="auto"
                        id="horse"
                        name="horse"
                        placeholder="e.g. brown"
                        value={horse}
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <br></br>
                </div>
                <form className="questionnaire-btn-container" onSubmit={this.handleSubmit}>
                    <button 
                        className={!sum && !horse ? "arrow-button button-submit-disabled" : "arrow-button button-submit"}
                        disabled={!sum && !horse} type="submit"> Submit </button> 
                </form>
                {this.state.modalIsOpen && <AttentionCheckModal player={player} triesLeft={player.get("attentionCheck3Tries")} onCloseModal={this.onCloseModal} /> }

            </div>
      </Centered>
    );
  }
}
