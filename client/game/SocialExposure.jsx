import "./GameComponents/chat/style.less";

import React from "react";
import ChatContainer from "./GameComponents/chat/ChatContainer.js";
import  Message  from "./GameComponents/chat/Message.js";
import Footer from "./GameComponents/chat/Footer.js";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

export default class SocialExposure extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const {player} = this.props;
    const activeChats = player.round.get("activeChats");
  }

  onOpenChat = (customKey) => {
    const {player} = this.props;
    const activeChats = player.round.get("activeChats");
    if (!activeChats.includes(customKey)) {
      activeChats.push(customKey);
      player.round.set("activeChats", activeChats);
    }
  }

  onCloseChat = (customKey)  => {
    const {player} = this.props;
    const activeChats = player.round.get("activeChats");
    const newActiveChats = activeChats.filter((chat) => chat !== customKey);
    player.round.set("activeChats", newActiveChats);
  }

  audio = new Audio(`sounds/notification-sound-7062.mp3`);

  logIncomingMessage = (msgs, customKey) => {
    const {game, round, stage, player} = this.props;

    const messages = round.get(`${customKey}`)
    const mostRecentMsg = messages[messages.length -1];
    const senderId = mostRecentMsg.player._id;
    const sender = game.players.find(p => p._id === senderId);

    // onIncomingMessage logs the message for both sender and receiver
    // Only log one copy of the message
    if (player._id === senderId) { // Player who sends message

      const pairOfPlayers = customKey.split("-");
      const receiverId = pairOfPlayers.filter((id) => parseInt(id) !== player.get("nodeId")); 
      const receiver = game.players.find(p => p.get("nodeId") === parseInt(receiverId));
      const receiverChats = receiver.round.get("activeChats");
      if (!receiverChats.includes(customKey)) {
        const newReceiverChats = [...receiverChats, customKey];
        receiver.round.set("activeChats", newReceiverChats);
        receiver.round.set("getNotified", true);
      }
      
      // Push a request onto advisor's request queue
      if (receiver.round.get("role") === "Advisor") { // Sent a request to advisor
        const requestQueue = receiver.round.get("requestQueue");
        const puzzleSet = sender.round.get("puzzleSet");

        const speakerId = player.round.get("pairedSpeaker");
        const speakerPlayer = game.players.find((p) => p.get("nodeId") === speakerId);
        const symbolDescription = speakerPlayer.round.get("symbolDescription");
        const request = {requestorId: player.get("nodeId"), message: mostRecentMsg, puzzleSet: puzzleSet, symbolDescription: symbolDescription, received: false}

        requestQueue.push(request);
        receiver.round.set("requestQueue", requestQueue);
      
        // Mark advisor as used for listener that sent the request
        const chosenAdvisors = sender.round.get("chosenAdvisors");
        chosenAdvisors[receiverId] = true;
        sender.round.set("chosenAdvisors", chosenAdvisors);
        stage.append("log", {
          verb: "sentRequest",
          subjectId: player.id,
          object: request,
          at: moment(TimeSync.serverTime(null, 1000)),
        })
      }

      if (receiver.round.get("role") === "Listener") { // Sent a reply to listener
        const requestQueue = sender.round.get("requestQueue");
        const removedRequest = requestQueue.shift(); // Removes first element from request queue
        sender.round.set("requestQueue", requestQueue);
        const completedRequests = sender.round.get("completedRequests"); // Add request and reply to completed requests array
        const completedRequest = {request: removedRequest, reply: mostRecentMsg}
        completedRequests.push(completedRequest);
        sender.round.set("completedRequests", completedRequests);

        stage.append("log", {
          verb: "completedRequest",
          subjectId: player.id,
          object: completedRequest,
          at: moment(TimeSync.serverTime(null, 1000)),
        })
      }

    }

    if (player._id !== senderId) { // Player who receives message
      // stage.append("log", {
      //   verb: "messageLog",
      //   subjectId: player.id,
      //   object: mostRecentMsg,
      //   at: moment(TimeSync.serverTime(null, 1000)),
      // })

      // const activeChats = player.round.get("activeChats");

      // if (!activeChats.includes(customKey)) {
      //   console.log("Chat closed but message delivered");
      // }

      // Play notification sound
      this.audio.play();

    }
  }




  // renderSocialInteraction(otherPlayer) {
  //   const value = otherPlayer.round.get("value");
  //   return (
  //     <div className="alter" key={otherPlayer._id}>
  //       <img src={otherPlayer.get("avatar")} className="profile-avatar" />
  //       <div className="range">
  //         <Slider
  //           min={0}
  //           max={1}
  //           stepSize={0.01}
  //           value={value}
  //           disabled
  //           hideHandleOnEmpty
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  renderSocialInteraction() {
    const { game, round, player } = this.props;
    const chosenAdvisors = player.round.get("chosenAdvisors");

    if (Object.keys(chosenAdvisors).length === 0) {
      return null;
    }

    // reactive time value only updates at 1000 ms
    const timeStamp = new Date(TimeSync.serverTime(null, 1000));
    return (
      <div className="all-chats-container">
        { Object.keys(chosenAdvisors).map(otherNodeId => {
            var pairOfPlayers = [player.get("nodeId"), otherNodeId];
            pairOfPlayers.sort((p1,p2) => p1 - p2);
            const otherPlayer = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId));
            // const otherPlayerId = otherPlayer.get("anonymousName");
            // const playerIsOnline = !otherPlayer.get("inactive");
            const chatKey = `${pairOfPlayers[0]}-${pairOfPlayers[1]}`;
            const activeChats = player.round.get("activeChats");
            const requestUsed = chosenAdvisors[otherNodeId];
            let advisorStatus;
            if (otherPlayer.round.get("requestQueue").length === 0) {
              if (!requestUsed) {
                advisorStatus = "Available";
              } else {
                advisorStatus = "Busy";
              }
            } else {
              if (otherPlayer.round.get("requestQueue")[0]["requestorId"] === player.get("nodeId")) {
                advisorStatus = "In Progress";
              } else { // Not the current request advisor is on
                advisorStatus = "Busy";
              }
            }


            return (
              <ChatContainer
                docked={true}
                key={otherNodeId}
                player={player}
                otherPlayer={otherNodeId}
                scope={round}
                timeStamp={timeStamp}
                customClassName={"ray-chat-container"}
                message={Message}
                footer={Footer}
                onIncomingMessage={this.logIncomingMessage}           
                customKey={chatKey}
                isOpen={activeChats.includes(chatKey)}
                playerIsOnline={true}
                onOpenChat = {(customKey) => this.onOpenChat(customKey)} 
                onCloseChat={(customKey) => this.onCloseChat(customKey)} 
                advisorStatus={advisorStatus}
                requestUsed={requestUsed}
              />
            )
          })
        }
      </div>
    )
  }

  renderAdvisorSocial() {
    const {game, round, stage, player} = this.props;
    const requestQueue = player.round.get("requestQueue");
         
    if (requestQueue.length === 0) {
      return null;
    } else {
      // reactive time value only updates at 1000 ms
      const timeStamp = new Date(TimeSync.serverTime(null, 1000));

      const {requestorId, message, puzzleSet, symbolDescription, received} = requestQueue[0];
      if (requestQueue[0]["received"] === false) {
        this.audio.play();
        requestQueue[0]["received"] = true;
        player.round.set("requestQueue", requestQueue);
      }
      var pairOfPlayers = [player.get("nodeId"), requestorId];
      pairOfPlayers.sort((p1,p2) => p1 - p2);
      const otherPlayer = game.players.find(p => p.get("nodeId") === requestorId);
      const chatKey = `${pairOfPlayers[0]}-${pairOfPlayers[1]}`;
      const activeChats = player.round.get("activeChats");

      return (
        <div className="all-chats-container">
          <ChatContainer
            docked={true}
            key={requestorId}
            player={player}
            otherPlayer={requestorId}
            scope={round}
            timeStamp={timeStamp}
            customClassName={"ray-chat-container"}
            message={Message}
            footer={Footer}
            onIncomingMessage={this.logIncomingMessage}           
            customKey={chatKey}
            isOpen={true}
            playerIsOnline={true}
            onOpenChat = {(customKey) => this.onOpenChat(customKey)} 
            onCloseChat={(customKey) => this.onCloseChat(customKey)} 
          />
        </div>
      )
    }
  }

  render() {
    const { game, round, player } = this.props;
    if (player.round.get("role") === "Speaker") {
      return null;
    } else if (player.round.get("role") === "Listener") {
      return this.renderSocialInteraction();
    } else if (player.round.get("role") === "Advisor"){
      return this.renderAdvisorSocial();
    } else {
      return this.renderWait();
    }
  }
}
