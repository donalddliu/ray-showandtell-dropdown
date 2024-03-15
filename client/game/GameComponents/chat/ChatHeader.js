import "./style.less";
import React from "react";

export default class ChatHeader extends React.PureComponent {


    render() {
        const {otherPlayer, onTitleClick, onXClick, playerIsOnline, advisorStatus}  = this.props;
        
        return (
            <div className="header">
                <span className="title" onClick={onTitleClick}> {otherPlayer} {advisorStatus ? `(${advisorStatus})` : ""} </span>
                <span className="close-button" onClick={onXClick}> 
                    <img src={`images/icon-net-window-close.png`} width="17px" height="17px"/>
                </span>
            </div>
        )
    }
}