import React, { Component } from 'react';

class SymbolDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, selected } = this.props;

        const zerofilled = ('0000'+name).slice(-4);

        return (
            <div className={`symbol-display-container ${selected}`} >
                <img className={`symbol-img ${selected}`} src={`images/continuum-symbols/04_shape_pole_${zerofilled}.png`} style={{width:"100%"}} />
            </div>
        );
    }
}

export default SymbolDisplay;
