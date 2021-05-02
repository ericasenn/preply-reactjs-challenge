import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import OnlineStatusMock from "./OnlineStatusMock";
import "./App.css";

/* 
Feel free to edit this all. If you don't need the HoC, go remove it. 
If you wish to save the state somewhere else, go for it. 
Just keep rendering <OnlineStatusMock /> 
*/

const afterSecs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let notificationPromise = undefined;

const withOnlineStatus = (WrappedComponent) =>
  class WithOnlineStatus extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isOnline: false };
    }
    render() {
      const { isOnline } = this.state;
      return (
        <>
          <OnlineStatusMock
            onIsOnlineChange={(isOnline) => {
              if (this.state.isOnline !== isOnline) {
                this.setState({ isOnline });
              }
            }}
          />
          <WrappedComponent {...this.props} isOnline={isOnline} />
        </>
      );
    }
  };

class App extends React.Component {
  componentDidUpdate({ isOnline }) {
    if (!notificationPromise) {
      notificationPromise = afterSecs(2000).then(() => {
        NotificationManager.info(isOnline ? "Online" : "Offline");
        notificationPromise = undefined;
      });
    }
  }

  render() {
    const { isOnline } = this.props;

    return (
      <>
        <div className={isOnline ? "online" : "offline"}>
          {isOnline ? "Online" : "Offline"}
          <NotificationContainer />
        </div>
      </>
    );
  }
}

export default withOnlineStatus(App);
