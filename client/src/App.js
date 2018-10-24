import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Button from "./components/Button";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Button />
        </div>
      </Provider>
    );
  }
}

export default App;
