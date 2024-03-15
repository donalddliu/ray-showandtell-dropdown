import React from "react";

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="survey-progress-bar-container">
                <div className="survey-progress-bar-filled" style={{width: `${this.props.percentSubmitted}%`}}>
                </div>
          </div>
        )

    }

};

