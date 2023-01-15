// This code is the entry point of the application.
import React from "react";

// Importing ReactDOM to render the application on the web page
import ReactDOM from "react-dom/client";

// Importing the App component
import App from "./App";

// Importing a function to report web vitals
import reportWebVitals from "./reportWebVitals";

// Importing bootstrap css
import "./bootstrap.min.css";

// Importing the Provider component from the 'react-redux' library
import { Provider } from "react-redux";

// Importing the store
import store from "./redux/store";

// Creating a root element to render the app on the web page
const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrapping the App component inside the Provider component to provide the store to the entire app.
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Reporting the web vitals
reportWebVitals();
