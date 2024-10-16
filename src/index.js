import React from "react";
import ReactDOM from "react-dom/client";
// import "./styles/style.scss";
import App from "../src/App";
import { Provider } from "react-redux";
import { store } from "../src/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
