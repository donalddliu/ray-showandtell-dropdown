import React, { Component } from 'react';

class SymbolDisplayResults extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, selected, width } = this.props;

        const zerofilled = ('0000'+name).slice(-4);

        return (
            <div className={`symbol-display-container ${selected}`} style={{width: `${width}`}}>
                <img className={`symbol-img ${selected}`} src={`images/continuum-symbols/04_shape_pole_${zerofilled}.png`} style={{width:"100%"}} />
            </div>
        );
    }
}

export default SymbolDisplayResults;
