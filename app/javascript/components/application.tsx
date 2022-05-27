import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App"

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  ReactDOM.render(<App />, rootEl);
});
