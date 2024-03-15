import React, { Component } from 'react';

class PlayerCard extends Component {
    constructor(props) {
        super(props);
    }

    // When button is selected, player sets the id of the button he selected
    // handleClick = () => {
    //     const { game, round, stage, player, name, selected, handlePlayerSelect, handlePlayerDeselect } = this.props;
    //     if (selected) {
    //         handlePlayerDeselect(name);
    //     } else {
    //         handlePlayerSelect(name);
    //     }
    // }

    render() {
        const { name, selected } = this.props;
        return (
            <div className="advisor-name-container">
                {name} advises
            </div>
        );
    }
}

export default PlayerCard;
