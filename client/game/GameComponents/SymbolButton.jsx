import React, { Component } from 'react';

class SymbolButton extends Component {
    constructor(props) {
        super(props);
    }

    // When button is selected, player sets the id of the button he selected
    handleClick = () => {
        const { game, round, stage, player, name, handleButtonSelect } = this.props;
        handleButtonSelect(name);
    }

    render() {
        const { name, selected } = this.props;

        const zerofilled = ('0000'+name).slice(-4);

        return (
            <div className={`symbol-container`} >
                <button className={`${selected ? "symbolButtonSelected" : "symbolButtonUnselected"}`} onClick={this.handleClick}>
                    <img className={`symbol-img ${selected ? "selected" : ""}`}src={`images/continuum-symbols/04_shape_pole_${zerofilled}.png`} style={{width: "100%"}} />
                </button>
            </div>
        );
    }
}

export default SymbolButton;
